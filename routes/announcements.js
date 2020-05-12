// Libraries
const cloudinary = require('cloudinary');
const fs = require('fs');
const multer = require('multer');
const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { promisify } = require('util');
// Models
const Announcement = require('../models/announcement');
// Helper Functions
const { isHttpUrl } = require('../utils/urlHelpers');
// Library Var
const unlinkAsync = promisify(fs.unlink);

// Setup Multer - local pic storage for Cloudinary

// const upload = multer({ dest: './uploads' });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('file in destination: ', file);
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const multerUpload = multer({ storage });

// GET - all announcements

router.get('/', (req, res) => {
  // TODO - add query string for options
  Announcement.find({}, (err, announcements) => {
    if (err) return res.status(500).send(err);

    res.status(200).json({ announcements });
  });
});

// GET - one announcement

router.get('/:id', (req, res) => {
  // TODO - add query string for options rollup data, populate, etc.
  const { id } = req.params;

  // Validate

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should be a valid user._id',
    });
  }

  // Get announcement

  Announcement.findById(id, (err, announcement) => {
    if (err) return res.status(500).send(err);

    res.status(200).json({ announcement });
  });
});

// POST - create a new announcement

router.post('/', multerUpload.single('imgFile'), (req, res) => {
  const { createdByUser } = req.query;
  const { description, url } = req.body;
  const height = parseFloat(req.body.height);
  const imgHeight = parseFloat(req.body.imgHeight);
  const imgWidth = parseFloat(req.body.imgWidth);
  const width = parseFloat(req.body.width);
  const x = parseFloat(req.body.x) / 100;
  const y = parseFloat(req.body.y) / 100;

  console.log('req.body: ', req.body);
  console.log('imgHeight: ', imgHeight);
  console.log('imgWidth: ', imgWidth);
  console.log('height; ', height);
  console.log('width: ', width);
  console.log('x: ', x);
  console.log('y: ', y);

  // Validation

  if (!isHttpUrl(url)) {
    return res.status(400).send({
      error: true,
      _msg:
        'The url field was not a valid url . See the urlFormat field in this response for the valid format.',
      urlFormat: `http://www.domaing.com`,
    });
  }

  // if (createdByUser !== undefined && !ObjectId.isValid(createdByUser)) {
  if (!ObjectId.isValid(createdByUser)) {
    return res.status(400).send({
      error: true,
      _msg: 'The createdByUser field is invalid and should be a valid user._id',
    });
  }

  cloudinary.v2.uploader.upload(
    req.file.path,
    {
      eager: [{ height, width, x, y, crop: 'crop' }],
      // height,
      // width,
      // x,
      // y,
      // crop: 'crop',
    },
    async (err, result) => {
      console.log('in cloudinary callback...');
      await unlinkAsync(req.file.path);
      const imgUrl = result.eager[0].url;
      const { public_id } = result;
    },
  );
  return res.json({ announcement: { ...req.body, likedBy: [], viewedBy: [] } });

  // Announcement.create({ announcementText, imgUrl, public_id, url }, (err, announcement) => {
  Announcement.create(
    {
      description,
      // imgUrl,
      meta: {
        createdByUser,
        updatedByUser: createdByUser,
      },
      // public_id,
      url,
    },
    (err, announcement) => {
      if (err) return res.status(500).send(err);

      res.status(201).json({ announcement });
    },
  );
  // },
  // );
});

// PATCH - update an announcement

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { updatedByUser } = req.query;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should be a valid announcement._id',
    });
  }

  if (!ObjectId.isValid(updatedByUser)) {
    return res.status(400).send({
      error: true,
      _msg: 'The updatedByUser field is invalid and should be a valid user._id',
    });
  }

  // Update announcement

  Announcement.findById(id, (err, announcementToUpdate) => {
    if (err) return res.status(500).send(err);

    announcementToUpdate.set({
      ...req.body, // TODO need to do validation
      meta: {
        updatedByUser,
      },
    });

    announcementToUpdate.save((err, updatedAnnouncement) => {
      if (err)
        return res
          .status(500)
          .send({ msg: 'An error occurred when attempting to update the announcement.' });

      res.status(200).json({ announcement: updatedAnnouncement.toObject() });
    });
  });
});

// DELETE - an announcement

router.delete('/:id', (req, res) => {
  // TODO - delete event id in other places
  const { id } = req.params;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should be a valid announcement._id',
    });
  }

  // Delete event

  Announcement.findByIdAndDelete(id, (err, deletedAnnouncement) => {
    if (err || deletedAnnouncement === null) {
      return res
        .status(500)
        .send({ msg: 'An error occurred when attempting to delete the announcement.' });
    }

    // cloudinary.v2.api.delete_resources([req.body.public_id], (err, result) => {
    return res.status(204).send({ msg: 'Successfully deleted announcement' });
    // });
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
      if (err) return res.status(500).send({ err });

      const data = { announcement: updatedAnnouncement, userId };
      req.app.io.of('/announcements').emit('announcementLikeUpdate', data);
      return res
        .status(200)
        .send({ msg: 'Successfully updated the announcement', updatedAnnouncement });
    },
  );
});

module.exports = router;
