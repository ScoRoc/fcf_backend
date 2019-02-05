const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wod = require('../models/wod');
const WodWeek = require('../models/wodweek');
const moment = require('moment');

// router.get('/', (req, res) => {
//   Wod.find({}, (err, wods) => {
//     if (err) {
//       console.log('err: ', err);
//       res.send(err);
//     } else {
//       res.json({ wods });
//     }
//   })
// });

// router.put('/', (req, res) => {
//   console.log('req body: ', req.body)
//   const { _id, text  } = req.body;
//   const date = moment(req.body.date)._d;
//   Wod.findByIdAndUpdate(_id, {
//     date,
//     text,
//   }, { new: true, runValidators: true }, (err, updatedWod) => {
//     if (err) {
//       console.log('err: ', err);
//       res.send({ err });
//     } else {
//       res.send({ msg: 'Successfully updated the wod', updatedWod});
//     }
//   });
// });

const postNewWod = async wod => {
  const { date, text } = wod;
  return await Wod.create({ date, text });
}

router.post('/', async (req, res) => {
  const wods = req.body.wods.map(wod => ({ ...wod, date: moment(wod.date)._d }) );
  const newWods = await Promise.all( wods.map(postNewWod) );
  const [ mon, tues, wed, thurs, fri, sat, sun ] = newWods;
  const wodIds = [ mon._id, tues._id, wed._id, thurs._id, fri._id, sat._id, sun._id ];
  WodWeek.create({ weekOf: moment(mon.date)._d, wods: wodIds }, (err, newWodWeek) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      const wodWeekWithWods = { _id: newWodWeek._id, weekOf: newWodWeek.weekOf, wods: newWodWeek.wods.map((wod, i) => newWods[i]) };
      res.json({ wodWeekWithWods });
    }
  });
});

module.exports = router;
