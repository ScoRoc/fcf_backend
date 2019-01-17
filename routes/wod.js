const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wod = require('../models/wod');
const moment = require('moment');

router.get('/', (req, res) => {
  Wod.find({}, (err, wods) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      res.json({ wods });
    }
  })
});

router.put('/', (req, res) => {
  console.log('req body: ', req.body)
  const { _id, text  } = req.body;
  const date = moment(req.body.date)._d;
  Wod.findByIdAndUpdate(_id, {
    date,
    text,
  }, { new: true, runValidators: true }, (err, updatedWod) => {
    if (err) {
      console.log('err: ', err);
      res.send({ err });
    } else {
      res.send({ msg: 'Successfully updated the wod', updatedWod});
    }
  });
});

router.post('/', (req, res) => {
  const { text } = req.body;
  const date = moment(req.body.date)._d;
    Wod.create({ date, text }, (err, wod) => {
      if (err) {
        console.log('err: ', err);
        res.send(err);
      } else {
        res.json({ wod });
      }
    });
});

module.exports = router;
