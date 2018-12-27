const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Manager = require('../models/manager');
const bcrypt = require('bcrypt');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

// await this
const findManager = email => {
  return Manager.findOne({email});
}

router.post('/login', (req, res) => {
  let hashedPass = '';
  let passwordMatch = false;
  Manager.findOne({email: req.body.email.toLowerCase()}, function(err, manager) {
    if (!manager) {
      res.json({manager: null, token: null});
    } else {
      hashedPass = manager.password;
      passwordMatch = bcrypt.compareSync(req.body.password, hashedPass);
      if (passwordMatch) {
        let token = jwt.sign(manager.toObject(), process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24
        });
        res.json({manager: manager.toObject(), token});
      } else {
        res.json({ error: true, message: 'Email or password is incorrect'});
      }
    }
  })
});

router.post('/addmanager', async (req, res) => {
  if ( await findManager(req.body.email) ) {
    res.send({errors: true, _message: 'There is already a user with that email.'});
  } else {
    const { email, firstName, lastName, password } = req.body;
    Manager.create(
      {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        password: password,
      }, (err, manager) => {
        if (err) {
          console.log('err: ', err);
          res.send(err);
        } else {
          res.json({ manager: manager.toObject() });
        }
      }
    )
  }
});

router.post('/validate', (req, res) => {
  let token = req.body.token;
  if (!token) {
    res.status(401).json({message: "Must pass the token"})
  } else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, manager) {
      if (err) {
        res.status(401).send(err)
      } else {
        Manager.findById({
          '_id': manager._id
        }, function(err, manager) {
          if (err) {
            res.status(401).send(err);
          } else {
            res.json({manager: manager.toObject(), token})
          }
        })
      }
    })
  }
});

module.exports = router;
