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

module.exports = router;
