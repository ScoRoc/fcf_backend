const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './uploads' });

const Announcement = require('../models/announcement');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

router.post('/cloudinarytest', upload.single('imgFile'), (req, res) => {
  const { src } = req.body;
  console.log('src: ', src);
  cloudinary.uploader.upload(src, result => {
    console.log('result: ', result);
    res.send('yo')
  });
});

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

router.post('/', (req, res) => {
  const { announcementText, url } = req.body;
  Announcement.create({ announcementText, url }, (err, announcement) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      res.json({ announcement });
    }
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
