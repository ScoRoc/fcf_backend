// Libraries
const cloudinary = require('cloudinary');
const fs = require('fs');
const { promisify } = require('util');
// Models
const Announcement = require('../models/announcement');
// Constants
const { IMG_UPDATE } = require('../constants/enums');
// Helper Functions
const { buildCroppedUrl, buildImage } = require('../utils/announcements/index');
// Library Var
const unlinkAsync = promisify(fs.unlink);

// GET - all announcements

const getAllAnnouncements = (req, res) => {
  // TODO - add query string for options

  Announcement.find({}, (err, announcements) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json({ announcements });
  });
};

// GET - one announcement

const getOneAnnouncement = (req, res) => {
  // TODO - add query string for options rollup data, populate, etc.

  Announcement.findById(req.params.id, (err, announcement) => {
    if (err) return res.status(500).send(err);

    res.status(200).json({ announcement });
  });
};

// POST - create a new announcement

const postAnnouncement = (req, res) => {
  const { createdByUserId } = req.query;
  const { description, url } = req.body;

  // TODO validate image props

  // Image

  const imageToSave = buildImage({
    crop: {
      height: req.body.cropHeight,
      width: req.body.cropWidth,
      x: req.body.cropX,
      y: req.body.cropY,
    },
    dimensions: {
      height: req.body.imgHeight,
      width: req.body.imgWidth,
    },
  });

  // Post to Cloudinary

  cloudinary.v2.uploader.upload(req.file.path, async (err, cloudinaryResult) => {
    await unlinkAsync(req.file.path);

    if (err) {
      return res.status(500).send(err);
    }

    imageToSave.cloudinary = {
      croppedUrl: buildCroppedUrl({
        ...imageToSave.crop.percent,
        format: cloudinaryResult.format,
        public_id: cloudinaryResult.public_id,
        version: cloudinaryResult.version,
      }),
      ...cloudinaryResult,
    };

    // Create new Announcement in db

    Announcement.create(
      {
        description,
        image: imageToSave,
        meta: {
          createdByUserId,
          updatedByUserId: createdByUserId,
        },
        url,
      },
      (err, announcement) => {
        if (err) {
          console.log('err: ', err);
          return res.status(500).send(err);
        }

        return res.status(201).json({ announcement });
      },
    );
  });
};

// PATCH functions

// no image update

const patchAnnouncement_NoImg = (req, res) => {
  Announcement.findById(req.params.id, (err, announcementToUpdate) => {
    if (err) return res.status(500).send(err);

    announcementToUpdate.set({
      ...req.body, // TODO need to do validation
      meta: {
        updatedByUserId: req.query.updatedByUserId,
      },
    });

    announcementToUpdate.save((err, updatedAnnouncement) => {
      if (err)
        return res
          .status(500)
          .send({ msg: 'An error occurred when attempting to update the announcement.' });

      return res.status(200).json({ announcement: updatedAnnouncement.toObject() });
    });
  });
};

// crop existing image

const patchAnnouncement_CropImg = (req, res) => {
  console.log('req.body.dimensions: ', req.body.dimensions);
  const imageToSave = buildImage({ crop: req.body.crop, dimensions: req.body.dimensions });

  Announcement.findById(req.params.id, (err, announcementToUpdate) => {
    if (err) return res.status(500).send(err);

    announcementToUpdate.set({
      description: req.body.description,
      image: {
        cloudinary: {
          ...announcementToUpdate.image.cloudinary,
          croppedUrl: buildCroppedUrl({
            ...imageToSave.crop.percent,
            format: announcementToUpdate.image.cloudinary.format,
            public_id: announcementToUpdate.image.cloudinary.public_id,
            version: announcementToUpdate.image.cloudinary.version,
          }),
        },
        crop: imageToSave.crop,
        dimensions: imageToSave.dimensions,
      },
      meta: {
        updatedByUserId: req.query.updatedByUserId,
      },
      url: req.body.url,
    });

    announcementToUpdate.save((err, updatedAnnouncement) => {
      if (err)
        return res
          .status(500)
          .send({ msg: 'An error occurred when attempting to update the announcement.' });

      return res.status(200).json({ announcement: updatedAnnouncement.toObject() });
    });
  });
};

// replace existing image with new image

const patchAnnouncement_NewImg = (req, res) => {
  const imageToSave = buildImage({
    crop: {
      height: req.body.cropHeight,
      width: req.body.cropWidth,
      x: req.body.cropX,
      y: req.body.cropY,
    },
    dimensions: {
      height: req.body.imgHeight,
      width: req.body.imgWidth,
    },
  });

  Announcement.findById(req.params.id, (err, announcementToUpdate) => {
    if (err) return res.status(500).send(err);

    cloudinary.v2.uploader.upload(req.file.path, async (err, cloudinaryResult) => {
      await unlinkAsync(req.file.path);

      if (err) {
        return res.status(500).send(err);
      }

      console.log('cloudinaryResult: ', cloudinaryResult);

      imageToSave.cloudinary = {
        croppedUrl: buildCroppedUrl({
          ...imageToSave.crop.percent,
          format: cloudinaryResult.format,
          public_id: cloudinaryResult.public_id,
          version: cloudinaryResult.version,
        }),
        ...cloudinaryResult,
      };

      cloudinary.v2.uploader.destroy(
        announcementToUpdate.image.cloudinary.public_id,
        (err, result) => {
          if (err) {
            console.log('err from cloudinary.v2.uploader.destroy: ', err);
            return res.status(500).send(err);
          }

          announcementToUpdate.set({
            description: req.body.description,
            image: {
              ...imageToSave,
              cloudinary: {
                ...cloudinaryResult,
                croppedUrl: buildCroppedUrl({
                  ...imageToSave.crop.percent,
                  format: cloudinaryResult.format,
                  public_id: cloudinaryResult.public_id,
                  version: cloudinaryResult.version,
                }),
              },
            },
            meta: {
              updatedByUserId: req.query.updatedByUserId,
            },
            url: req.body.url,
          });

          announcementToUpdate.save((err, updatedAnnouncement) => {
            if (err)
              return res
                .status(500)
                .send({ msg: 'An error occurred when attempting to update the announcement.' });

            return res.status(200).json({ announcement: updatedAnnouncement.toObject() });
          });
        },
      );
    });
  });
};

// PATCH - update an announcement

const patchAnnouncement = (req, res) => {
  const { imgUpdate } = req.query;

  // Not updating the image at all

  if (imgUpdate === IMG_UPDATE.NONE) {
    return patchAnnouncement_NoImg(req, res);
  }

  // Updating the crop for the existing image

  if (imgUpdate === IMG_UPDATE.CROP) {
    return patchAnnouncement_CropImg(req, res);
  }

  // Replacing the existing image with a new image

  if (imgUpdate === IMG_UPDATE.NEW_IMG) {
    return patchAnnouncement_NewImg(req, res);
  }
};

const viewAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { viewedByUserId } = req.query;

  try {
    const announcementToUpdate = await Announcement.findById(id).exec();

    // Bail if user has already viewed
    if (announcementToUpdate.viewedBy.includes(viewedByUserId)) {
      console.log(`User id ${viewedByUserId} has already viewed this announcement.`);
      return res.send(`User id ${viewedByUserId} has already viewed this announcement.`);
    }

    announcementToUpdate.viewedBy.push(viewedByUserId);
    const updatedAnnouncement = await announcementToUpdate.save().exec();

    res.send(updatedAnnouncement);
  } catch (err) {
    res.status(500).send({ err, msg: 'An error occurred when attempting to modify the database' });
  }
};

// DELETE - an announcement

const deleteAnnouncement = (req, res) => {
  const { id } = req.params;

  Announcement.findByIdAndDelete(id, (err, deletedAnnouncement) => {
    if (err || deletedAnnouncement === null) {
      console.log('err from Announcement.findByIdAndDelete: ', err);
      return res
        .status(500)
        .send({ msg: 'An error occurred when attempting to delete the announcement.' });
    }

    cloudinary.v2.uploader.destroy(
      deletedAnnouncement.image.cloudinary.public_id,
      (err, result) => {
        if (err) {
          console.log('err from cloudinary.v2.uploader.destroy: ', err);
          return res.status(500).send(err);
        }

        return res.status(204).send({ msg: 'Successfully deleted announcement' });
      },
    );
  });
};

module.exports = {
  deleteAnnouncement,
  getAllAnnouncements,
  getOneAnnouncement,
  patchAnnouncement,
  postAnnouncement,
  viewAnnouncement,
};
