const mongoose = require('mongoose');

const wodSchema = new mongoose.Schema({
  attended: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
  text: {
    type: String,
    minlength: 1,
    maxlength: 75,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
});

const Wod = mongoose.model('Wod', wodSchema);

module.exports = Wod;
