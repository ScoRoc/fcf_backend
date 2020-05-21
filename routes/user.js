// Libraries
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
// Models
const User = require('../models/user');
// Constants
const { APP_USER_ID, TOKEN_DURATION } = require('../constants/globals');
const { LAST_LOGIN } = require('../constants/maps');
const { ROLES } = require('../constants/enums');

// GET - all users

router.get('/', (req, res) => {
  // TODO - add query string for options rollup data, populate, etc.

  User.find({}, (err, users) => {
    if (err) return res.status(500).send(err);

    res.status(200).json({ users });
  });
});

// GET - one user

router.get('/:id', (req, res) => {
  // TODO - add query string for options rollup data, populate, etc.
  const { id } = req.params;

  // Validate

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should be a valid user._id',
    });
  }

  // Get user

  User.findById(id, (err, user) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ user });
  });
});

// POST - create new user

router.post('/', async (req, res) => {
  const { createdByUser, loginFrom } = req.query;
  const { email, firstName, lastName, password, role } = req.body; // TODO NEEDS VALIDATION

  // Validation

  if (loginFrom && !Object.values(LAST_LOGIN).includes(loginFrom)) {
    return res.status(400).send({
      enumValues: LAST_LOGIN,
      error: true,
      _msg:
        'The loginFrom field was incorrect. See the enumValues field in this response for possible values.',
    });
  }

  if (createdByUser !== undefined && !ObjectId.isValid(createdByUser)) {
    return res.status(400).send({
      error: true,
      _msg: 'The createdByUser field is invalid and should either be null or a valid user._id',
    });
  }

  if (await User.findOne({ email: req.body.email })) {
    return res.status(200).send({ error: true, _msg: 'There is already a user with that email.' });
  }

  // Create user

  User.create(
    {
      firstName,
      lastName,
      email,
      meta: {
        createdByUser: createdByUser || APP_USER_ID,
        lastLogin: {
          app: loginFrom === LAST_LOGIN.APP ? new Date() : undefined,
          portal: loginFrom === LAST_LOGIN.PORTAL ? new Date() : undefined, // ??? if created from portal they aren't logging in...I think... ???
        },
        updatedByUser: createdByUser || APP_USER_ID,
      },
      password,
      role: role || ROLES.USER,
    },
    (err, createdUser) => {
      // Error creating user

      if (err) return res.status(500).send(err);

      // Remove password

      const { password, ...user } = createdUser.toObject();

      // If created through app, add token

      if (loginFrom === LAST_LOGIN.APP) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: TOKEN_DURATION });
        return res.cookie('token', token, { httpOnly: true }).status(201).send(user);
      } else {
        return res.status(201).send({ user });
      }
    },
  );
});

// PATCH - update a user

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

  User.findById(id, (err, userToUpdate) => {
    if (err) return res.status(500).send(err);

    console.log('userToUpdate: ', userToUpdate);
    console.log('req.body: ', req.body);

    const userUpdate = Object.entries(req.body).reduce((update, [key, value]) => {
      if (value) update[key] = value;
      return update;
    }, {});

    userToUpdate.set({
      ...userToUpdate,
      // TODO need to do validation
      ...userUpdate,
      meta: {
        updatedByUser,
      },
    });

    userToUpdate.save((err, updatedUser) => {
      if (err) {
        console.log('err: ', err);
        return res
          .status(500)
          .send({ msg: 'An error occurred when attempting to update the user.' });
      }

      res.status(200).json({ user: updatedUser.toObject() });
    });
  });
});

// DELETE - a user

router.delete('/:id', (req, res) => {
  // TODO - delete user id in other places
  const { id } = req.params;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should be a valid user._id',
    });
  }

  // Delete user

  User.findByIdAndDelete(id, (err, deletedUser) => {
    if (err || deletedUser === null) {
      return res.status(500).send({ msg: 'An error occurred when attempting to delete the user.' });
    }

    return res.status(204).send({ msg: 'Successfully deleted user.' });
  });
});

module.exports = router;
