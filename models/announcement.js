const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  announcementText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150,
    lowercase: true,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
  url: {
    type: String,
    required: false,
    minlength: 11,
    lowercase: true,
    trim: true,
  }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
