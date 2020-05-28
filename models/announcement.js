const mongoose = require('mongoose');
const imageSchema = require('./image');

const announcementSchema = new mongoose.Schema(
  {
    description: {
      maxlength: 150,
      minlength: 1,
      required: true,
      trim: true,
      type: String,
    },
    image: {
      required: true,
      type: imageSchema,
    },
    likedBy: [
      {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    meta: {
      createdByUserId: {
        immutable: true,
        ref: 'User',
        required: function () {
          return !!this.meta.createdByUserId;
        },
        type: mongoose.Schema.Types.ObjectId,
      },
      updatedByUserId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    url: {
      // url when clicking on text
      required: false,
      trim: true,
      type: String,
    },
    viewedBy: [
      {
        // which users have clicked on the url
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'meta.dateCreated',
      updatedAt: 'meta.dateUpdated',
    },
  },
);

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
