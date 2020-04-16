// Libraries
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const moment = require('moment');
const ObjectId = require('mongoose').Types.ObjectId;
// Models
const User = require('../models/user');
// Constants
const { APP_USER_ID, TOKEN_DURATION } = require('../constants/globals');
const { LAST_LOGIN, ROLES } = require('../constants/enums');

// Helper Functions

const createToken = user => {
  return jwt.sign(user.toObject(), process.env.JWT_SECRET, {
    expiresIn: TOKEN_DURATION,
  });
}

// GET - all users

router.get('/', (req, res) => {
  // TODO - add query string for options rollup data, populate, etc.
  User.find({}, (err, users) => {
    if (err) return res.send(err);

    res.json({ users });
  });
});

// GET - single user

router.get('/:id', (req, res) => {
  // TODO - add query string for options rollup data, populate, etc.
  const { id } = req.params;

  // Validate

  if (!ObjectId.isValid(id)) {
    return res.send({
      error: true,
      _msg: 'The id field is invalid and should be a valid user._id',
    });
  }

  User.findById(id, (err, user) => {
    if (err) return res.send(err);

    res.json({ user });
  });
});

// POST - create new user

router.post('/', async (req, res) => {
  const { createdByUser, loginFrom } = req.query;
  const { email, firstName, lastName, password, role } = req.body; // TODO NEEDS VALIDATION

  // Validation

  if (!Object.values(LAST_LOGIN).includes(loginFrom)) {
    return res.send({
      enumValues: LAST_LOGIN,
      error: true,
      _msg: 'The loginFrom field was incorrect. It should be an enum. See the enumValues field in this response for possible values.',
    });
  }

  if (createdByUser !== undefined && !ObjectId.isValid(createdByUser)) {
    return res.send({
      error: true,
      _msg: 'The createdByUser field is invalid and should either be null or a valid user._id',
    });
  }

  if ( await User.findOne({ email: req.body.email }) ) {
    return res.send({ error: true, _msg: 'There is already a user with that email.' });
  }

  // Create document

  User.create({
    firstName,
    lastName,
    lastLogin: {
      app: loginFrom === 'app' ? new Date() : null,
      portal: loginFrom === 'portal' ? new Date() : null,
    },
    email,
    meta: {
      createdByUser: createdByUser || APP_USER_ID,
      updatedByUser: createdByUser || APP_USER_ID,
    },
    password,
    role: role || ROLES.USER,
  }, (err, user) => {
    if (err) return res.send(err);

    res.json({ user: { attributes: user.toObject(), token: createToken(user) } });
  });
});

// PATCH - update a user

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

  // Update document

  User.findById(id, (err, userToUpdate) => {
    if (err) return res.send(err);

    userToUpdate.set({
      ...req.body,
      meta: {
        updatedByUser,
      },
    });
    userToUpdate.save((err, updatedUser) => {
      if (err) return res.status(400).send({ msg: 'An error occurred when attempting to update the user.' });

      res.json({ user: { attributes: updatedUser.toObject() } });
    });
  });
});

// DELETE - a user

router.delete('/:id', (req, res) => {
  // TODO - delete user id in other places
  const { id } = req.params;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.send({
      error: true,
      _msg: 'The id field is invalid and should be a valid user._id',
    });
  }

  // Delete document

  User.findByIdAndDelete(id, (err, deletedUser) => {
    if (err || deletedUser === null) {
      return res.status(400).send({ msg: 'An error occurred when attempting to delete the user.' });
    }

    return res.send({ msg: 'Successfully deleted user.' });
  });
});

// ??? DO I NEED

router.post('/login', async (req, res) => {
  const errMsg = 'Email or password is incorrect.';
  let user = await User.findOne({ email: req.body.email });
  const hashedPass = user ? user.password : '';
  !user
    ? res.json({ user: null, token: null, errors: true, _msg: errMsg })
    : bcrypt.compareSync(req.body.password, hashedPass)
      ? res.json({ user: user.toObject(), token: createToken(user) })
      : res.json({ errors: true, _msg: errMsg });
});

// ??? DO I NEED

router.put('/password', (req, res) => {
  const { id, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  User.findByIdAndUpdate(id, { password: hash }, (err, updatedUser) => {
    if (err) return res.send(err);

      res.json({ updatedUser });
  });
});

// ??? DO I NEED

router.post('/validate', (req, res) => {
  const token = req.body.token;
  if (!token) res.status(401).json({errors: true, _msg: "Must pass the token"})
    
  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) return res.status(401).send(err);
    
    User.findById({ '_id': user._id }, function(err, foundUser) {
      if (err) return res.status(401).send(err);
      
      res.json({user: foundUser.toObject(), token})
    });
  });
});

module.exports = router;
