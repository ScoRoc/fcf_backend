const mongoose = require('mongoose');

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
      cloudinary: {
        eagerUrl: {
          required: true,
          type: String,
        },
        public_id: {
          required: true,
          type: String,
        },
        transformation: {
          required: true,
          type: String,
        },
        url: {
          required: true,
          type: String,
        },
      },
      crop: {
        height: {
          required: true,
          type: Number,
        },
        percent: {
          height: {
            required: true,
            type: Number,
          },
          width: {
            required: true,
            type: Number,
          },
          x: {
            required: true,
            type: Number,
          },
          y: {
            required: true,
            type: Number,
          },
        },
        width: {
          required: true,
          type: Number,
        },
        x: {
          required: true,
          type: Number,
        },
        y: {
          required: true,
          type: Number,
        },
      },
      dimensions: {
        height: {
          required: true,
          type: Number,
        },
        width: {
          required: true,
          type: Number,
        },
      },
    },
    likedBy: [
      {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
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
