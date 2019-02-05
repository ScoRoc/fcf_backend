const mongoose = require('mongoose');

const arrayLimit = val => val.length <= 7;

const wodweekSchema = new mongoose.Schema({
  weekOf: {
    type: Date,
    required: true,
  },
  wods: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Wod',
    required: true,
    validate: [arrayLimit, `{PATH} exceeds the limit of 7`],
  },
});

const WodWeek = mongoose.model('WodWeek', wodweekSchema);

module.exports = WodWeek;
