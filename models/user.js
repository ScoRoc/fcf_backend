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
      lastLogin: {
        app: { type: Date },
        portal: { type: Date },
      },
      updatedByUser: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    password: {
      maxlength: 99,
      minlength: 8,
      required: true,
      select: false,
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

userSchema.methods.hasPortalAccess = function (role) {
  const portalAccess = [ROLES.ADMIN, ROLES.SUPER_ADMIN];
  return portalAccess.includes(role);
};

userSchema.methods.isCorrectPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isCorrect) {
    err ? cb(err) : cb(err, isCorrect);
  });
};

userSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    const doc = this; // save ref bc bcrypt.hash changes scope which changes this
    const saltRounds = 10;
    bcrypt.hash(doc.password, saltRounds, function (err, hashedPassword) {
      if (err) next(err);

      doc.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
