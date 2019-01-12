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
      events.sort((a, b) => {
        return a.startDate === b.startDate
                            ? 0
                            : a.startDate < b.startDate
                              ? -1
                              : 1;
      });
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

router.put('/', (req, res) => {
  console.log('req body: ', req.body)
  const { eventText, _id, startDate, types, url, throughDate  } = req.body;
  Event.findByIdAndUpdate(_id, {
    eventText,
    startDate,
    types,
    url,
    throughDate
  }, { new: true, runValidators: true }, (err, updatedEvent) => {
    if (err) {
      console.log('err: ', err);
      res.send({ err });
    } else {
      res.send({ msg: 'Successfully updated the event', updatedEvent});
    }
  });
});

router.delete('/', (req, res) => {
  console.log('req body id: ', req.body.id)
  Event.findByIdAndDelete(req.body.id).exec((err, deletedEvent) => {
    console.log('deletedEvent: ', deletedEvent);
    res.send({ msg: 'Successfully deleted event', deletedEvent });
  });
});

module.exports = router;
