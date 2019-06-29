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
  if (req.params.sort === 'bymonth') return getByMonth(req, res);

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
  const { eventText, type, url } = req.body;
  const startDate = moment(req.body.startDate)._d;
  const throughDate = req.body.throughDate ? moment(req.body.throughDate)._d : null;
    Event.create({ eventText, startDate, throughDate, type, url }, (err, event) => {
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
  const { eventText, _id, startDate, type, url, throughDate  } = req.body;
  Event.findByIdAndUpdate(_id, {
    eventText,
    startDate,
    type,
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

router.put('/like', async (req, res) => {
  const { eventId, userId } = req.body;
  const foundEvent = await Event.findById(eventId).lean();
  const operation = foundEvent.likes.includes(userId) ? '$pull' : '$push';
  Event.findByIdAndUpdate(eventId, { [operation]: {likes: userId} }, { new: true }, (err, updatedEvent) => {
    if (err) {
      console.log('err: ', err);
      res.send({ err });
    } else {
      res.send({ msg: 'Successfully updated the event', updatedEvent});
    }
  });
});

  //////////////////////////////
 // helpers for GET /bymonth //
//////////////////////////////
const getMonth = event => moment(event.startDate).month();
const getYear = event => moment(event.startDate).year();

const longFormatted = unit => {
  const formats = {
    month: month => moment().month(month).format('MMMM'),
    year: year => moment().year(year).format('YYYY'),
  }
  return {
    getFormatted: event => formats[unit](event),
  }
}
const getLongFormattedMonth = longFormatted('month').getFormatted;
const longFormattedMonth = event => getLongFormattedMonth( getMonth(event) );

const monthNameNonCurrentyear = event => `${longFormattedMonth(event)} ${getYear(event)}`;
const getMonthName = event => {
  const currentYear = moment().year();
  return moment(event.startDate).year() === currentYear
                      ? longFormattedMonth(event)
                      : monthNameNonCurrentyear(event);
};

const findByMonth = (event, arr) => arr.find(item => item.month === getMonthName(event));
const getMonthIdx = (event, arr) => arr.indexOf( findByMonth(event, arr) );

const monthFactory = (event, monthName) => {
  const month = moment(event.startDate).month();
  return { month: monthName, events: [ event ] };
}
//////////////////////////////

const getByMonth = (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      const sortedEvents = sortByDate(events).reduce((acc, event) => {
        const monthName = getMonthName(event);
        const monthIdx = getMonthIdx(event, acc);
        const month = monthIdx >= 0 ? acc[monthIdx] : null;
        month ? month.events.push(event) : acc.push( monthFactory(event, monthName) );
        return acc;
      }, []);
      res.json({sortedEvents});
    }
  })
};

module.exports = router;
