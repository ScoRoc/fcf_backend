// Libraries
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const moment = require('moment');
// Models
const User = require('../models/user');
// Constants
const { TOKEN_DURATION } = require('../constants/globals');

// Helper Functions

const createToken = user => {
  return jwt.sign(user.toObject(), process.env.JWT_SECRET, {
    expiresIn: TOKEN_DURATION,
  });
}

// GET - all users

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      res.json({ users });
    }
  });
});

// POST - a new user

router.post('/', async (req, res) => {
  if ( await User.findOne({ email: req.body.email }) ) {
    res.send({ error: true, _message: 'There is already a user with that email.' });
  }

  const { email, firstName, lastName, password, userId } = req.body;
  User.create({
    firstName,
    lastName,
    email,
    meta: {
      createdByUser: userId,
      updatedByUser: userId,
    },
    password,
  }, (err, user) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      res.json({ user: { attributes: user.toObject(), token: createToken(user) } });
    }
  });
});

// DELETE - a user

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    if (err || deletedUser === null) {
      res.status(400).send({ msg: 'An error occurred when attempting to delete the user.' });
    } else {
      res.send({ msg: 'Successfully deleted user.' });
    }
  });
});

// PATCH - a user

// NOT DONE NOT DONE NOT DONE
// NOT DONE NOT DONE NOT DONE
router.patch('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    'meta.createdByUser': req.body.userId, // not being blocked by pre validate
    'meta.updatedByUser': req.body.userId,
  }, {
    new: true,
  }, (err, updatedUser) => {
    if (err) {
      console.log('err: ', err);
      res.status(400).send({ msg: 'An error occurred when attempting to update the user.' });
    } else {
      res.json({ user: { attributes: updatedUser.toObject(), token: createToken(updatedUser) } });
    }
  });
});

// ???

router.post('/login', async (req, res) => {
  const errMsg = 'Email or password is incorrect.';
  let user = await User.findOne({ email: req.body.email });
  const hashedPass = user ? user.password : '';
  !user ? res.json({ user: null, token: null, errors: true, _message: errMsg })
          : bcrypt.compareSync(req.body.password, hashedPass)
            ? res.json({ user: user.toObject(), token: createToken(user) })
            : res.json({ errors: true, _message: errMsg });
});

// ???

router.post('/test-create', async (req, res) => {

  if ( await User.findOne({ email: req.body.email }) ) {
    res.send({errors: true, _message: 'There is already a user with that email.'});
  } else {
    const { email, firstName, lastName, password } = req.body;
    User.create(
      {
        firstName,
        lastName,
        email,
        password,
      }, (err, user) => {
        if (err) {
          console.log('err: ', err);
          res.send(err);
        } else {
          res.json({ user: user.toObject() });
        }
      }
    )
  }
});

// ???

router.put('/password', (req, res) => {
  const { id, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  User.findByIdAndUpdate(id, { password: hash }, (err, updatedUser) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      res.json({ updatedUser });
    }
  });
});

// ???

router.post('/validate', (req, res) => {
  const token = req.body.token;
  if (!token) {
    res.status(401).json({errors: true, _message: "Must pass the token"})
  } else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
      if (err) {
        res.status(401).send(err);
      } else {
        User.findById({
          '_id': user._id
        }, function(err, foundUser) {
          if (err) {
            console.log('in else, User findByID, but ERR')
            res.status(401).send(err);
          } else {
            res.json({user: foundUser.toObject(), token})
          }
        });
      }
    });
  }
});

module.exports = router;
