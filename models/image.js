const mongoose = require('mongoose');
const cloudinarySchema = require('./cloudinary');

const imageSchema = new mongoose.Schema({
  cloudinary: {
    required: true,
    type: cloudinarySchema,
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
});

const Image = mongoose.model('Image', imageSchema);

module.exports = {
  imageSchema,
  Image,
};
