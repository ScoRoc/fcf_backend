const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  announcementText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150,
    trim: true,
  },
  imgUrl: {
    type: String,
  },
  likes: {
    type: [String],
    required: true,
  },
  public_id: {
    type: String,
  },
  url: {
    type: String,
    required: false,
    lowercase: true,
    trim: true,
  }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
