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

router.delete('/', (req, res) => {
  Announcement.findByIdAndDelete(req.body.id).exec((err, foo) => {
    console.log('err: ', err);
    console.log('foo: ', foo);
    res.send('yo')
  })
});

module.exports = router;
