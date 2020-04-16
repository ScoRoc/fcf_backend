const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  endDate: {
    type: Date,
  },
  likedBy: [{
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  }],
  meta: {
    createdByUser: {
      immutable: true,
      ref: 'User',
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    updatedByUser: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  name: {
    maxlength: 25,
    minlength: 1,
    required: true,
    trim: true,
    type: String,
  },
  startDate: {
    required: true,
    type: Date,
  },
  type: {
    required: true,
    type: String,
  },
  url: {
    lowercase: true,
    minlength: 11,
    required: false,
    trim: true,
    type: String,
  },
  viewedBy: [{ // which users have clicked on the url
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  }],
}, {
  timestamps: {
    createdAt: 'meta.dateCreated',
    updatedAt: 'meta.dateUpdated',
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
