const mongoose = require('mongoose');

const cloudinarySchema = new mongoose.Schema({
  croppedUrl: {
    required: true,
    type: String,
  },
  // Cloudinary fields
  asset_id: {
    required: false,
    type: String,
  },
  bytes: {
    required: false,
    type: Number,
  },
  created_at: {
    required: false,
    type: String,
  },
  etag: {
    required: false,
    type: String,
  },
  format: {
    required: true,
    type: String,
  },
  height: {
    required: false,
    type: Number,
  },
  original_filename: {
    required: false,
    type: String,
  },
  placeholder: {
    required: false,
    type: Boolean,
  },
  public_id: {
    required: true,
    type: String,
  },
  resource_type: {
    required: false,
    type: String,
  },
  secure_url: {
    required: false,
    type: String,
  },
  signature: {
    required: false,
    type: String,
  },
  tags: {
    required: false,
    type: Array,
  },
  type: {
    required: false,
    type: String,
  },
  url: {
    required: true,
    type: String,
  },
  version_id: {
    required: false,
    type: String,
  },
  version: {
    required: true,
    type: Number,
  },
  width: {
    required: false,
    type: Number,
  },
});

const Cloudinary = mongoose.model('Cloudinary', cloudinarySchema);

module.exports = {
  cloudinarySchema,
  Cloudinary,
};
