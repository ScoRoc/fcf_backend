// Libraries
const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
// Models
const Wod = require('../models/wod');
// Helper Functions
const { isDateString } = require('../utils/dateHelpers');
// Maps
const { WODS } = require('../constants/maps');

// GET - all wods

router.get('/', (req, res) => {
  // TODO - add query string for options
  const { direction } = req.query;

  Wod.find({}, (err, wods) => {
    if (err) return res.status(500).send(err);

    res.status(200).json({ wods: direction === WODS.DIRECTION.ASC.value ? wods : wods.reverse() });
  });
});

// GET - one wod

router.get('/:id', (req, res) => {
  // TODO - add query string for options rollup data, populate, etc.
  const { id } = req.params;

  // Validate

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should be a valid wod._id',
    });
  }

  // Get wod

  Wod.findById(id, (err, wod) => {
    if (err) return res.status(500).send(err);

    res.status(200).json({ wod });
  });
});

// POST - create new wod

router.post('/', async (req, res) => {
  const { createdByUser } = req.query;
  const { date, description, name } = req.body; // TODO NEEDS VALIDATION

  // Validation

  if (!isDateString(date)) {
    return res.status(400).send({
      error: true,
      _msg: 'The date field is not a valid date.',
    });
  }

  if (createdByUser !== undefined && !ObjectId.isValid(createdByUser)) {
    return res.status(400).send({
      error: true,
      _msg: 'The createdByUser field is invalid and should either be null or a valid user._id',
    });
  }

  // Create wod

  Wod.create(
    {
      date,
      description,
      meta: {
        createdByUser,
        updatedByUser: createdByUser,
      },
      name,
    },
    (err, wod) => {
      if (err) return res.status(500).send(err);

      res.status(201).json({ wod });
    },
  );
});

// PATCH - update a wod

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { updatedByUser } = req.query;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should a valid user._id',
    });
  }

  if (!ObjectId.isValid(updatedByUser)) {
    return res.status(400).send({
      error: true,
      _msg: 'The updatedByUser field is invalid and should be a valid user._id',
    });
  }

  // Update user

  Wod.findById(id, (err, wodToUpdate) => {
    if (err) return res.status(500).send(err);

    wodToUpdate.set({
      ...req.body, // TODO need to do validation
      meta: {
        updatedByUser,
      },
    });

    wodToUpdate.save((err, updatedWod) => {
      if (err)
        return res
          .status(500)
          .send({ msg: 'An error occurred when attempting to update the wod.' });

      res.status(200).json({ wod: updatedWod.toObject() });
    });
  });
});

// DELETE - an event

router.delete('/:id', (req, res) => {
  // TODO - delete wod id in other places
  const { id } = req.params;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should be a valid wod._id',
    });
  }

  // Delete event

  Wod.findByIdAndDelete(id, (err, deletedWod) => {
    if (err || deletedWod === null) {
      return res.status(500).send({ msg: 'An error occurred when attempting to delete the wod.' });
    }

    return res.status(204).send({ msg: 'Successfully deleted wod' });
  });
});

// ??? DO I NEED

router.put('/like', async (req, res) => {
  const { wodId, userId, type } = req.body;
  const foundWod = await Wod.findById(wodId).lean();
  const operation = foundWod[type].includes(userId) ? '$pull' : '$push';
  Wod.findByIdAndUpdate(
    wodId,
    { [operation]: { [type]: userId } },
    { new: true },
    (err, updatedWod) => {
      if (err) {
        console.log('err: ', err);
        res.status(500).send({ err });
      } else {
        res.status(200).send({ msg: 'Successfully updated the wod', updatedWod });
      }
    },
  );
});

module.exports = router;
