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
const getLongFormattedYear = longFormatted('year').getFormatted;

const findBy = (item, arr, unit) => {
  const momented = moment(item.startDate)[unit]();
  const formattedDateMap = {
    month: getLongFormattedMonth(momented),
    year: parseInt( getLongFormattedYear(momented) )
  }
  const formattedDate = formattedDateMap[unit];
  return arr.find( idx => idx[unit] === formattedDate );
}
const findByMonth = (item, arr) => findBy(item, arr, 'month');
const findByYear = (item, arr) => findBy(item, arr, 'year');

const monthFactory = event => {
  const month = moment(event.startDate).month();
  return { month: getLongFormattedMonth(month), events: [ event ] };
}

const yearFactory = event => {
  const year = moment(event.startDate).year();
  return { year, months: [ monthFactory(event) ] };
}

router.get('/bymonth', (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      const arrangedEvents = [];
      events.forEach(event => {
        const yearIdx = arrangedEvents.indexOf( findByYear(event, arrangedEvents) );
        const year = yearIdx >= 0 ? arrangedEvents[yearIdx] : null;
        const monthIdx = year
                        ? year.months.indexOf( findByMonth(event, year.months) )
                        : -1;
        const month = monthIdx >= 0 ? year.months[monthIdx] : null
        year
          ? month
            ? month.events.push(event)
            : year.months.push( monthFactory(event) )
          : arrangedEvents.push( yearFactory(event) );
      });
      const sortedEvents = arrangedEvents.slice(0);
      sortedEvents.forEach(year => {
        year.months.forEach(month => {
          month.events = sortByDate(month.events);
        });
      });
      res.json({sortedEvents});
    }
  })
});

module.exports = router;
