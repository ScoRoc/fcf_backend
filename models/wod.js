const mongoose = require('mongoose');

const wodSchema = new mongoose.Schema(
  {
    date: {
      required: true,
      type: Date,
      unique: true,
    },
    description: {
      maxlength: 75,
      minlength: 1,
      required: true,
      type: String,
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
        required: true,
        type: mongoose.Schema.Types.ObjectId,
      },
      updatedByUserId: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    name: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'meta.dateCreated',
      updatedAt: 'meta.dateUpdated',
    },
  },
);

const Wod = mongoose.model('Wod', wodSchema);

module.exports = Wod;
