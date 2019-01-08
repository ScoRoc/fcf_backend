const express = require('express');
const router = express.Router();
const multer = require('multer');
// const upload = multer({ dest: '../uploads' });

const Announcement = require('../models/announcement');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${new Date()}-${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

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

router.post('/', upload.single('file'), (req, res) => {
  const { announcementText, file, foo, url } = req.body;
  console.log('req body: ', req.body);
  // console.log('file: ', file);
  console.log('req.file: ', req.file);

  // cloudinary.uploader.upload(file, (err, result) => {
  cloudinary.uploader.upload('./uploads/imgTest.jpg', (err, result) => {
    console.log('err: ', err);
    console.log('result: ', result);
    Announcement.create({ announcementText, url }, (err, announcement) => {
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
