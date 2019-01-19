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

router.get('/bymonth', (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      console.log('events: ', events);
        ////////////////////////////////////
       // Breakdown of each data section //
      ////////////////////////////////////
      const eventsArrEx = [];
      const eventsYearEx = {
        year: 'year',
        months: [],
      };
      const eventsMonthsEx = [];
      const eventsMonthEx = {
        month: 'month',
        events: [],
      };
      ////////////////////////////////////

      const findBy = (item, arr, unit) => {
        arr.find( idx => idx[unit] === moment(item)[unit]() );
      }

      const yearFactory = year => {
        return { year, months: [] };
      }
      const monthFactory = month => {
        return { month, events: [] };
      }

      const sortedEvents = [];
      // events.forEach(event => {
      //   const yearIdx = sortedEvents.find(sortedEvent => {
      //     sortedEvent.year === moment(event).year();
      //   })
      // });

      // not working
      events.forEach(event => {
        const yearIdx = sortedEvents.indexOf( findBy(event, sortedEvents, 'year') );
        yearIdx >= 0 ? sortedEvents[yearIdx].push(event) : sortedEvents.push( yearFactory( moment(event).year() ) );
      });

      console.log('sortedEvents: ', sortedEvents);

      const eventsArr = [
        {
          year: 2019,
          months: [
            {
              month: 'jan',
              events: [
                {title: 'title', startDate: 'num'},
                {title: 'title', startDate: 'num'},
              ],
            },
            {
              month: 'feb',
              events: [
                {title: 'title', startDate: 'num'},
                {title: 'title', startDate: 'num'},
              ],
            },
          ]
        },
        {
          year: 2020,
          months: [
            {
              month: 'jan',
              events: [
                {title: 'title', startDate: 'num'},
                {title: 'title', startDate: 'num'},
              ],
            },
            {
              month: 'feb',
              events: [
                {title: 'title', startDate: 'num'},
                {title: 'title', startDate: 'num'},
              ],
            },
          ]
        },
      ];
      res.json({eventsArr: eventsArr})
      // res.json({events: events})
      // res.json({ events: sortByDate(events) });
    }
  })
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

module.exports = router;
