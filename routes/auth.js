// Libraries
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
// Models
const User = require('../models/user');
// Middlewater
const withAuth = require('../middleware/withAuth');
// CONSTANTS
const { TOKEN_DURATION } = require('../constants/globals');
const { LOGIN_FROM } = require('../constants/enums');

// GET - check if client has a valid token

router.get('/', withAuth, function (req, res) {
  return res.sendStatus(200);
});

// POST - authenticate a user

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const { loginFrom } = req.query;

  // Validation

  if (!Object.values(LOGIN_FROM).includes(loginFrom))
    return res.send({
      error: true,
      loginFrom: LOGIN_FROM,
      _msg:
        'The loginFrom field was incorrect. See the loginFrom field from this response for possible values.',
    });

  // Find User

  User.findOne({ email: email.toLowerCase() })
    .select('+password')
    .exec(function (err, user) {
      // Error handling

      if (err) {
        res.status(500).json({ err, error: true, _msg: 'Internal error, please try again.' });
      }

      if (!user) res.status(401).json({ error: true, _msg: 'Incorrect email or password' });

      if (loginFrom === LOGIN_FROM.PORTAL && !user.hasPortalAccess(user.role)) {
        res.status(401).json({ error: true, _msg: 'This user does not have access to this page.' });
      }

      // Verify Password

      user.isCorrectPassword(password, function (err, isCorrect) {
        // Error handling

        if (err) res.status(500).json({ error: true, _msg: 'Internal error, please try again.' });

        if (!isCorrect) res.status(401).json({ error: true, _msg: 'Incorrect email or password.' });

        // Create and send token

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: TOKEN_DURATION });
        res.cookie('token', token, { httpOnly: true }).sendStatus(200);
      });
    });
});

// DELETE - logout a user

router.delete('/logout', (req, res) => {
  //
});

module.exports = router;
