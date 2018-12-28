const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  announcementText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150
  },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
