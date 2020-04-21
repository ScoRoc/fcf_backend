// Libraries
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
// Models
const User = require('../models/user');
// Middlewater
const { withAuth } = require('../middleware/auth');
const { withUser } = require('../middleware/models');
// CONSTANTS
const { TOKEN_DURATION } = require('../constants/globals');
const { LOGIN_FROM } = require('../constants/enums');

// GET - check if client has a valid token

router.get('/', withAuth, function (req, res) {
  // console.log('req.cookies: ', req.cookies);
  User.findOne({ email: req.email }, '_id', (err, id) => {
    if (err) {
      console.log('err: ', err);
      return res.send(err);
    }

    return res.status(200).send(id);
  });
});

// POST - authenticate a user

router.post('/', withUser, (req, res) => {
  const { email, password } = req.body;
  const { loginFrom } = req.query;

  // Validation

  if (!Object.values(LOGIN_FROM).includes(loginFrom)) {
    return res.send({
      error: true,
      loginFrom: LOGIN_FROM,
      _msg:
        'The loginFrom field was incorrect. See the loginFrom field from this response for possible values.',
    });
  }

  // Find User

  User.findOne({ email: email.toLowerCase() })
    .select('+password')
    .exec(function (err, foundUser) {
      // Error handling

      if (err) {
        console.log('err: ', err);
        res.status(500).json({ err, error: true, _msg: 'Internal error, please try again.' });
      }

      if (!foundUser) res.status(401).json({ error: true, _msg: 'Incorrect email or password' });

      if (loginFrom === LOGIN_FROM.PORTAL && !foundUser.hasPortalAccess(foundUser.role)) {
        res.status(401).json({ error: true, _msg: 'This user does not have access to this page.' });
      }

      // Verify Password

      foundUser.isCorrectPassword(password, function (err, isCorrect) {
        // Error handling

        if (err) {
          console.log('err: ', err);
          res.status(500).json({ error: true, _msg: 'Internal error, please try again.' });
        }

        if (!isCorrect) res.status(401).json({ error: true, _msg: 'Incorrect email or password.' });

        // Save new login point

        foundUser.set({
          meta: {
            lastLogin: {
              app: loginFrom === 'app' ? new Date() : undefined,
              portal: loginFrom === 'portal' ? new Date() : undefined,
            },
          },
        });

        foundUser.save((err, updatedUser) => {
          // Error saving user
          if (err) {
            console.log('An error occurred while saving the user: ', err);
            res.send('err: ', err);
          }

          // Create and send token, along with user

          const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: TOKEN_DURATION });
          const { password, ...user } = updatedUser.toObject();
          console.log('res: ', res);
          return res.cookie('token', token, { httpOnly: true }).status(200).send({ user });
        });
      });
    });
});

// DELETE - logout a user

router.delete('/', (req, res) => {
  return res.clearCookie('token').status(200).send({ _msg: 'Cleared cookies.' });
});

module.exports = router;
