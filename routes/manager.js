const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Manager = require('../models/manager');
const bcrypt = require('bcrypt');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  Manager.find({}, (err, allManagers) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      res.json({ allManagers });
    }
  });
});

// await this
const findManagerByEmail = email => {
  return Manager.findOne({email});
}

const doesPasswordMatch = (pw, hashedPw) => {
  return bcrypt.compareSync(pw, hashedPw);
}

const createToken = manager => {
  const expireTime = 60 * 60 * 24 * 7
  return jwt.sign(manager.toObject(), process.env.JWT_SECRET, {
    expiresIn: expireTime,
  });
}

router.post('/signin', async (req, res) => {
  const errMsg = 'Email or password is incorrect.';
  let manager = await findManagerByEmail(req.body.email);
  const hashedPass = manager ? manager.password : '';
  !manager  ? res.json({ manager: null, token: null, errors: true, _message: errMsg })
            : doesPasswordMatch(req.body.password, hashedPass)
              ? res.json({ manager: manager.toObject(), token: createToken(manager) })
              : res.json({ errors: true, _message: errMsg });
});

router.post('/addmanager', async (req, res) => {
  if ( await findManagerByEmail(req.body.email) ) {
    res.send({errors: true, _message: 'There is already a user with that email.'});
  } else {
    const { email, firstName, lastName, superUser, password } = req.body;
    Manager.create(
      {
        firstName,
        lastName,
        email,
        superUser,
        password,
      }, (err, manager) => {
        if (err) {
          console.log('err: ', err);
          res.send(err);
        } else {
          res.json({ manager: manager.toObject(), managerPassword: password });
        }
      }
    )
  }
});

router.post('/validate', (req, res) => {
  const token = req.body.token;
  if (!token) {
    res.status(401).json({errors: true, _message: "Must pass the token"})
  } else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, manager) {
      if (err) {
        res.status(401).send(err)
      } else {
        Manager.findById({
          '_id': manager._id
        }, function(err, foundManager) {
          if (err) {
            res.status(401).send(err);
          } else {
            res.json({manager: foundManager.toObject(), token})
          }
        });
      }
    });
  }
});

module.exports = router;
