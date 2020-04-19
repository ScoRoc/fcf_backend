// Libraries
const cloudinary = require('cloudinary');
const express = require('express');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const { promisify } = require('util');
// Models
const Announcement = require('../models/announcement');
// Library Var
const unlinkAsync = promisify(fs.unlink);

// Setup Multer - local pic storage for Cloudinary

// const upload = multer({ dest: './uploads' });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// GET - all announcement

router.get('/', (req, res) => {
  Announcement.find({}, (err, announcements) => {
    if (err) return res.send(err);

    res.json({ announcements });
  });
});

// POST - create a new announcement

router.post('/', upload.single('imgFile'), (req, res) => {
  // const { announcementText, file, foo, url } = req.body;
  const { announcementText, crop, url } = req.body;
  const height = parseInt(req.body.height) / 100;
  const width = parseInt(req.body.width) / 100;
  const x = parseInt(req.body.x) / 100;
  const y = parseInt(req.body.y) / 100;
  cloudinary.v2.uploader.upload(
    req.file.path,
    {
      eager: [{ width, height, x, y, crop: 'crop' }],
    },
    async (err, result) => {
      await unlinkAsync(req.file.path);
      const imgUrl = result.eager[0].url;
      const { public_id } = result;
      Announcement.create({ announcementText, imgUrl, public_id, url }, (err, announcement) => {
        if (err) return res.send(err);

        res.json({ announcement });
      });
    },
  );
});

// PUT - update an announcement

router.put('/', (req, res) => {
  const { announcementText, id, url } = req.body;
  Announcement.findByIdAndUpdate(
    id,
    { announcementText, url },
    { new: true, runValidators: true },
    (err, updatedAnnouncement) => {
      if (err) return res.send({ err });

      return res.send({ msg: 'Successfully updated the announcement', updatedAnnouncement });
    },
  );
});

// DELETE - an announcement

router.delete('/', (req, res) => {
  Announcement.findByIdAndDelete(req.body.id).exec((err, deletedAnnouncement) => {
    cloudinary.v2.api.delete_resources([req.body.public_id], (err, result) => {
      return res.send({ msg: 'Successfully deleted announcement', deletedAnnouncement });
    });
  });
});

// ??? DO I NEED

router.put('/like', async (req, res) => {
  const { announcementId, userId } = req.body;
  const foundAnnouncement = await Announcement.findById(announcementId).lean();
  const operation = foundAnnouncement.likes.includes(userId) ? '$pull' : '$push';
  Announcement.findByIdAndUpdate(
    announcementId,
    { [operation]: { likes: userId } },
    { new: true },
    (err, updatedAnnouncement) => {
      if (err) return res.send({ err });

      const data = { announcement: updatedAnnouncement, userId };
      req.app.io.of('/announcements').emit('announcementLikeUpdate', data);
      return res.send({ msg: 'Successfully updated the announcement', updatedAnnouncement });
    },
  );
});

module.exports = router;
