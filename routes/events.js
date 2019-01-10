const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/event');


router.get('/', (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      res.json({ events });
    }
  })
});

router.post('/', (req, res) => {
  const { eventText, startDate, types, url } = req.body;
  const throughDate = req.body.throughDate || null;
    Event.create({ eventText, startDate, throughDate, types, url }, (err, event) => {
      if (err) {
        console.log('err: ', err);
        res.send(err);
      } else {
        res.json({ event });
      }
    });
});

// router.put('/', (req, res) => {
//   const { announcementText, id, url  } = req.body;
//   Announcement.findByIdAndUpdate(id, { announcementText, url }, { new: true, runValidators: true }, (err, updatedAnnouncement) => {
//     if (err) {
//       console.log('err: ', err);
//       res.send({ err });
//     } else {
//       res.send({ msg: 'Successfully updated the announcement', updatedAnnouncement});
//     }
//   });
// });

// router.delete('/', (req, res) => {
//   Announcement.findByIdAndDelete(req.body.id).exec((err, deletedAnnouncement) => {
//     console.log('deletedAnnouncement: ', deletedAnnouncement);
//     res.send({ msg: 'Successfully deleted announcement', deletedAnnouncement });
//   });
// });

module.exports = router;
