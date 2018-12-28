const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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

router.post('/', (req, res) => {
  const { announcementText } = req.body;
  Announcement.create({ announcementText }, (err, announcement) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      res.json({ announcement });
    }
  });
});

router.put('/', (req, res) => {
  const { announcementText, id  } = req.body;
  Announcement.findByIdAndUpdate(id, { announcementText }, { new: true, runValidators: true }, (err, updatedAnnouncement) => {
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
