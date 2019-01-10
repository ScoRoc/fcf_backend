const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventText: {
    type: String,
    lowercase: true,
    minlength: 1,
    maxlength: 25,
    required: true,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  throughDate: {
    type: Date,
    required: false,
  },
  types: {
    type: [String],
    required: true,
  },
  url: {
    type: String,
    lowercase: true,
    minlength: 11,
    required: false,
    trim: true,
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
