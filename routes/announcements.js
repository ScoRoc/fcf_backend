const express = require('express');
const router = express.Router();

const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const multer = require('multer');
// const upload = multer({ dest: './uploads' });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const Announcement = require('../models/announcement');


router.get('/', (req, res) => {
  Announcement.find({}, (err, announcements) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      res.json({ announcements });
    }
  })
});

router.post('/', upload.single('imgFile'), (req, res) => {
  // const { announcementText, file, foo, url } = req.body;
  const { announcementText, crop, url } = req.body;
  const height = parseInt(req.body.height) / 100;
  const width = parseInt(req.body.width) / 100;
  const x = parseInt(req.body.x) / 100;
  const y = parseInt(req.body.y) / 100;
  cloudinary.v2.uploader.upload(req.file.path, {
    eager: [ { width, height, x, y, crop: 'crop' } ],
  }, async (err, result) => {
    await unlinkAsync(req.file.path);
    const imgUrl = result.eager[0].url;
    Announcement.create({ announcementText, imgUrl, url }, (err, announcement) => {
      if (err) {
        console.log('err: ', err);
        res.send(err);
      } else {
        res.json({ announcement });
      }
    });
  });
});

router.put('/', (req, res) => {
  const { announcementText, id, url  } = req.body;
  Announcement.findByIdAndUpdate(id, { announcementText, url }, { new: true, runValidators: true }, (err, updatedAnnouncement) => {
    if (err) {
      console.log('err: ', err);
      res.send({ err });
    } else {
      res.send({ msg: 'Successfully updated the announcement', updatedAnnouncement});
    }
  });
});

router.delete('/', (req, res) => {
  Announcement.findByIdAndDelete(req.body.id).exec((err, deletedAnnouncement) => {
    console.log('deletedAnnouncement: ', deletedAnnouncement);
    res.send({ msg: 'Successfully deleted announcement', deletedAnnouncement });
  });
});

module.exports = router;
