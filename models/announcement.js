const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  cloudinary: {
    imgUrl: { // from Cloudinary
      required: true,
      type: String,
    },
    public_id: { // from Cloudinary
      required: true,
      type: String,
    },
  },
  description: {
    maxlength: 150,
    minlength: 1,
    required: true,
    trim: true,
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
    updatedByUser: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  url: { // url when clicking on text
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

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
