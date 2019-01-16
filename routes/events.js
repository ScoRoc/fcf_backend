const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/event');
const moment = require('moment');

const sortByDate = arr => {
  return arr.sort((a, b) => {
    return a.startDate === b.startDate
                        ? 0
                        : a.startDate < b.startDate
                          ? -1
                          : 1;
  });
}

router.get('/', (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      res.json({ events: sortByDate(events) });
    }
  })
});

router.post('/', (req, res) => {
  const { eventText, types, url } = req.body;
  const startDate = moment(req.body.startDate)._d;
  const throughDate = req.body.throughDate ? moment(req.body.throughDate)._d : null;
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
