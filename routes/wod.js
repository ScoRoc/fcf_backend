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
  const { _id, text  } = req.body;
  Wod.findByIdAndUpdate(_id, { text }, { new: true, runValidators: true }, (err, updatedWod) => {
    if (err) {
      console.log('err: ', err);
      res.send({ err });
    } else {
      // console.log('updatedWod: ', updatedWod)
      res.send({ msg: 'Successfully updated the wod', updatedWod});
    }
  });
});

// router.post('/', (req, res) => {
//   const { day, text } = req.body;
//   const date = moment(req.body.date)._d;
//   Wod.create({ day, date, text }, (err, wod) => {
//     if (err) {
//       console.log('err: ', err);
//       res.send(err);
//     } else {
//       res.json({ wod });
//     }
//   });
// });

module.exports = router;
