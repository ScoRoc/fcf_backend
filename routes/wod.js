// Libraries
const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
// Models
const Wod = require('../models/wod');
// Helper Functions
const { isDateString } = require('../utils/dateHelpers');

// GET - all wods

router.get('/', (req, res) => {
  // TODO - add query string for options
  Wod.find({}, (err, wods) => {
    if (err) return res.send(err);

    res.json({ wods });
  });
});

// GET - one wod

router.get('/:id', (req, res) => {
  // TODO - add query string for options rollup data, populate, etc.
  const { id } = req.params;

  // Validate

  if (!ObjectId.isValid(id)) {
    return res.send({
      error: true,
      _msg: 'The id field is invalid and should be a valid wod._id',
    });
  }

  // Get wod

  Wod.findById(id, (err, wod) => {
    if (err) return res.send(err);

    res.json({ wod });
  });
});

// POST - create new wod

router.post('/', async (req, res) => {
  const { createdByUser } = req.query;
  const { date, description } = req.body; // TODO NEEDS VALIDATION

  // Validation

  if (!isDateString(date)) {
    return res.send({
      error: true,
      _msg: 'The date field is not a valid date.',
    });
  }

  if (createdByUser !== undefined && !ObjectId.isValid(createdByUser)) {
    return res.send({
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
    },
    (err, wod) => {
      if (err) return res.send(err);

      res.json({ wod });
    },
  );
});

// PATCH - update a wod

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

  // Update user

  Wod.findById(id, (err, wodToUpdate) => {
    if (err) return res.send(err);

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

      res.json({ wod: updatedWod.toObject() });
    });
  });
});

// DELETE - an event

router.delete('/:id', (req, res) => {
  // TODO - delete wod id in other places
  const { id } = req.params;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.send({
      error: true,
      _msg: 'The id field is invalid and should be a valid wod._id',
    });
  }

  // Delete event

  Wod.findByIdAndDelete(id, (err, deletedWod) => {
    if (err || deletedWod === null) {
      return res.status(500).send({ msg: 'An error occurred when attempting to delete the wod.' });
    }

    return res.send({ msg: 'Successfully deleted wod' });
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
        res.send({ err });
      } else {
        res.send({ msg: 'Successfully updated the wod', updatedWod });
      }
    },
  );
});

module.exports = router;
