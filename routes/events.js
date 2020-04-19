// Libraries
const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
// Models
const Event = require('../models/event');
// Helper Functions
const { isDateString } = require('../utils/dateHelpers');
const { isHttpUrl } = require('../utils/urlHelpers');
const { sort } = require('../utils/sorting');
const { sortByMonth } = require('../utils/routeHelpers');
// Constants
const { EVENT_TYPES } = require('../constants/enums');

// GET - all events

router.get('/', (req, res) => {
  const { sortBy = 'none' } = req.query;

  // Find events

  Event.find({}, (err, events) => {
    if (err) return res.send(err);

    const sortMap = {
      month: events => sortByMonth(events), // TODO NEED TO CLEAN UP INTERNAL FUNCS
      none: events => sort({ arr: events, sortByKey: 'startDate' }),
    };

    res.json({ events: sortMap[sortBy](events) });
  });
});

// GET - one event

router.get('/:id', (req, res) => {
  // TODO - add query string for options rollup data, populate, etc.
  const { id } = req.params;

  // Validate

  if (!ObjectId.isValid(id)) {
    return res.send({
      error: true,
      _msg: 'The id field is invalid and should be a valid event._id',
    });
  }

  // Get event

  Event.findById(id, (err, event) => {
    if (err) return res.send(err);

    res.json({ event });
  });
});

// POST - create new event

router.post('/', (req, res) => {
  const { endDate, name, startDate, type, url } = req.body;
  const { createdByUser } = req.query;

  // Validation

  if (!createdByUser || !ObjectId.isValid(createdByUser)) {
    return res.send({
      error: true,
      _msg: 'The createdByUser field is invalid and should either be null or a valid user._id',
    });
  }

  if (endDate && !isDateString(endDate)) {
    return res.send({
      error: true,
      _msg: 'The endDate field is not a valid date.',
    });
  }

  if (!isDateString(startDate)) {
    return res.send({
      error: true,
      _msg: 'The startDate field is not a valid date.',
    });
  }

  if (!Object.values(EVENT_TYPES).includes(type)) {
    return res.send({
      enumValues: EVENT_TYPES,
      error: true,
      _msg:
        'The type field was incorrect. See the enumValues field in this response for possible values.',
    });
  }

  if (!isHttpUrl(url)) {
    return res.send({
      error: true,
      _msg: 'The url field is not a valid url or it does not start with http or https.',
    });
  }

  // Create event

  Event.create(
    {
      endDate: endDate && new Date(endDate),
      meta: {
        createdByUser,
        updatedByUser: createdByUser,
      },
      name,
      startDate: new Date(startDate),
      type,
      url,
    },
    (err, event) => {
      if (err) return res.send(err);

      res.json({ event });
    },
  );
});

// PATCH - update an event

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { updatedByUser } = req.query;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.send({
      error: true,
      _msg: 'The id field is invalid and should a valid user._id',
    });
  }

  if (!ObjectId.isValid(updatedByUser)) {
    return res.send({
      error: true,
      _msg: 'The updatedByUser field is invalid and should be a valid user._id',
    });
  }

  // Update event

  Event.findById(id, (err, eventToUpdate) => {
    if (err) return res.send(err);

    eventToUpdate.set({
      ...req.body, // TODO need to do validation
      meta: {
        updatedByUser,
      },
    });

    eventToUpdate.save((err, updatedEvent) => {
      if (err)
        return res
          .status(500)
          .send({ msg: 'An error occurred when attempting to update the event.' });

      res.json({ event: updatedEvent.toObject() });
    });
  });
});

// DELETE - an event

router.delete('/:id', (req, res) => {
  // TODO - delete event id in other places
  const { id } = req.params;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.send({
      error: true,
      _msg: 'The id field is invalid and should be a valid event._id',
    });
  }

  // Delete event

  Event.findByIdAndDelete(id, (err, deletedEvent) => {
    if (err || deletedEvent === null) {
      return res
        .status(500)
        .send({ msg: 'An error occurred when attempting to delete the event.' });
    }

    return res.send({ msg: 'Successfully deleted event' });
  });
});

// ??? DO I NEED

router.put('/like', async (req, res) => {
  const { eventId, userId } = req.body;
  const foundEvent = await Event.findById(eventId).lean();
  const operation = foundEvent.likes.includes(userId) ? '$pull' : '$push';
  Event.findByIdAndUpdate(
    eventId,
    { [operation]: { likes: userId } },
    { new: true },
    (err, updatedEvent) => {
      if (err) return res.send({ err });

      const data = { event: updatedEvent, userId };
      req.app.io.of('/events').emit('eventLikeUpdate', data);
      return res.send({ msg: 'Successfully updated the event', updatedEvent });
    },
  );
});

module.exports = router;
