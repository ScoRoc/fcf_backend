const mongoose = require('mongoose');

const wodSchema = new mongoose.Schema({
  date: {
    required: true,
    type: Date,
  },
  description: {
    maxlength: 75,
    minlength: 1,
    required: true,
    type: String,
  },
  likedBy: [{
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  }],
  meta: {
    createdByUser: {
      ref: 'User',
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    dateCreated: {
      required: true,
      type: Date,
    },
    dateUpdated: {
      type: Date,
    },
    updatedByUser: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
  },
});

const Wod = mongoose.model('Wod', wodSchema);

module.exports = Wod;
