// Libraries
const router = require('express').Router();
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
  // TODO - add query string for options
  const { sortBy = 'none' } = req.query;

  Event.find({}, (err, events) => {
    if (err) return res.status(400).send(err);

    const sortMap = {
      month: events => sortByMonth(events), // TODO NEED TO CLEAN UP INTERNAL FUNCS
      none: events => sort({ arr: events, sortByKey: 'startDate' }),
    };

    res.status(200).json({ events: sortMap[sortBy](events) });
  });
});

// GET - one event

router.get('/:id', (req, res) => {
  // TODO - add query string for options rollup data, populate, etc.
  const { id } = req.params;

  // Validate

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should be a valid event._id',
    });
  }

  // Get event

  Event.findById(id, (err, event) => {
    if (err) return res.send(err);

    res.status(200).json({ event });
  });
});

// POST - create new event

router.post('/', (req, res) => {
  const { createdByUserId } = req.query;
  const { endDate, name, startDate, type, url } = req.body;

  // Validation

  if (!createdByUserId || !ObjectId.isValid(createdByUserId)) {
    return res.status(400).send({
      error: true,
      _msg: 'The createdByUserId field is invalid and should either be null or a valid user._id',
    });
  }

  if (endDate && !isDateString(endDate)) {
    return res.status(400).send({
      error: true,
      _msg: 'The endDate field is not a valid date.',
    });
  }

  if (!isDateString(startDate)) {
    return res.status(400).send({
      error: true,
      _msg: 'The startDate field is not a valid date.',
    });
  }

  if (!Object.values(EVENT_TYPES).includes(type)) {
    return res.status(400).send({
      enumValues: EVENT_TYPES,
      error: true,
      _msg:
        'The type field was incorrect. See the enumValues field in this response for possible values.',
    });
  }

  if (!isHttpUrl(url)) {
    return res.status(400).send({
      error: true,
      _msg: 'The url field is not a valid url or it does not start with http or https.',
    });
  }

  // Create event

  Event.create(
    {
      endDate: endDate && endDate,
      meta: {
        createdByUserId,
        updatedByUserId: createdByUserId,
      },
      name,
      startDate: startDate,
      type,
      url,
    },
    (err, event) => {
      if (err) return res.status(500).send(err);

      res.status(201).json({ event });
    },
  );
});

// PATCH - update an event

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { updatedByUserId } = req.query;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should a valid user._id',
    });
  }

  if (!ObjectId.isValid(updatedByUserId)) {
    return res.status(400).send({
      error: true,
      _msg: 'The updatedByUserId field is invalid and should be a valid user._id',
    });
  }

  // Update event

  Event.findById(id, (err, eventToUpdate) => {
    if (err) return res.status(500).send(err);

    eventToUpdate.set({
      ...req.body, // TODO need to do validation
      meta: {
        updatedByUserId,
      },
    });

    eventToUpdate.save((err, updatedEvent) => {
      console.log('err: ', err);
      if (err)
        return res
          .status(500)
          .send({ msg: 'An error occurred when attempting to update the event.' });

      res.status(200).json({ event: updatedEvent.toObject() });
    });
  });
});

// PATCH - update event.viewedBy

router.patch('/:id/viewedBy/', async (req, res) => {
  const { id } = req.params;
  const { viewedByUserId } = req.query;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should a valid event._id',
    });
  }

  if (!ObjectId.isValid(viewedByUserId)) {
    return res.status(400).send({
      error: true,
      _msg: 'The viewedByUserId field is invalid and should be a valid user._id',
    });
  }

  try {
    const eventToUpdate = await Event.findById(id).exec();

    // Bail if user has already viewed
    if (eventToUpdate.viewedBy.includes(viewedByUserId)) {
      console.log(`User id ${viewedByUserId} has already viewed this event.`);
      return res.send(`User id ${viewedByUserId} has already viewed this event.`);
    }

    eventToUpdate.viewedBy.push(viewedByUserId);
    const updatedEvent = await eventToUpdate.save();

    res.send(updatedEvent);
  } catch (err) {
    console.log('err: ', err);
    res.status(500).send({ err, msg: 'An error occurred when attempting to modify the database' });
  }
});

// DELETE - an event

router.delete('/:id', (req, res) => {
  // TODO - delete event id in other places
  const { id } = req.params;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
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

    return res.status(204).send({ msg: 'Successfully deleted event' });
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
      if (err) return res.status(500).send({ err });

      const data = { event: updatedEvent, userId };
      req.app.io.of('/events').emit('eventLikeUpdate', data);
      return res.status(200).send({ msg: 'Successfully updated the event', updatedEvent });
    },
  );
});

module.exports = router;
