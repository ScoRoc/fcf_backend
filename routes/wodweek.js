const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wod = require('../models/wod');
const WodWeek = require('../models/wodweek');
const moment = require('moment');

const sortByDateDescending = arr => {
  return arr.sort((a, b) => {
    return a.weekOf === b.weekOf
                        ? 0
                        : a.weekOf < b.weekOf
                          ? 1
                          : -1;
  });
}

const getWod = id => {
  return Wod.findById(id);
}

const getWodWeekWithWod = async wodWeek => {
  return { _id: wodWeek._id, weekOf: wodWeek.weekOf, wods: await Promise.all(wodWeek.wods.map(getWod)) }
}

router.get('/', (req, res) => {
  WodWeek.find({}, async (err, wodWeeks) => {
    if (err) {
      console.log('err: ', err);
      res.send(err);
    } else {
      const wodWeeksWithWods = await Promise.all( wodWeeks.map(getWodWeekWithWod) );
      res.json({ wodWeeks: sortByDateDescending(wodWeeksWithWods) });
    }
  })
});

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

deleteWod = async id => {
  return await Wod.findByIdAndDelete(id);
}

router.delete('/', async (req, res) => {
  const { _id, wodIds } = req.body;
  const deletedWods = await Promise.all(wodIds.map(deleteWod));
  // console.log('deletedWods: ', deletedWods);
  WodWeek.findByIdAndDelete(_id).exec((err, deletedWodWeek) => {
    // console.log('deletedWodWeek: ', deletedWodWeek);
    res.send({ msg: 'Successfully deleted event', deletedWodWeek });
  });
});

module.exports = router;
