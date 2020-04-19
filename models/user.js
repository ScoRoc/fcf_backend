// Libraries
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Utils
const { ROLES } = require('../constants/enums');

const userSchema = new mongoose.Schema(
  {
    announcements: {
      liked: [
        {
          ref: 'Announcement',
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
      viewed: [
        {
          // which urls have they clicked on
          ref: 'Announcement',
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
    },
    email: {
      lowercase: true,
      maxlength: 99,
      minlength: 5,
      // required: true,
      trim: true,
      type: String,
      unique: true,
    },
    events: {
      liked: [
        {
          ref: 'Event',
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
      viewed: [
        {
          // which urls have they clicked on
          ref: 'Event',
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
    },
    firstName: {
      maxlength: 99,
      minlength: 1,
      // required: true,
      type: String,
    },
    lastLogin: {
      app: { type: Date },
      portal: { type: Date },
    },
    lastName: {
      maxlength: 99,
      minlength: 1,
      // required: true,
      type: String,
    },
    meta: {
      createdByUser: {
        immutable: true,
        ref: 'User',
        // required: true,
        type: mongoose.Schema.Types.ObjectId,
      },
      updatedByUser: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    password: {
      maxlength: 99,
      minlength: 8,
      // required: true,
      type: String,
    },
    role: {
      enum: Object.values(ROLES),
      // required: true,
      type: String,
    },
    wods: {
      liked: [
        {
          ref: 'Wod',
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
    },
  },
  {
    timestamps: {
      createdAt: 'meta.dateCreated',
      updatedAt: 'meta.dateUpdated',
    },
  },
);

userSchema.methods.authenticated = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, res) {
    err ? cb(err) : cb(null, res ? this : false);
  });
};

userSchema.pre('save', function (next) {
  if (this.isNew) {
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
  }
  next();
});

userSchema.set('toJSON', {
  transform: function (doc, returned, options) {
    const returnObject = { ...returned };
    delete returnObject.password;
    return returnObject;
  },
});

userSchema.set('toObject', {
  transform: function (doc, returned, options) {
    const returnObject = { ...returned };
    delete returnObject.password;
    return returnObject;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
