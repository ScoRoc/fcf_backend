// Libraries
const cloudinary = require('cloudinary');
const fs = require('fs');
const multer = require('multer');
const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { promisify } = require('util');
// Models
const Announcement = require('../models/announcement');
// Constants
const { IMG_UPDATE } = require('../constants/enums');
// Helper Functions
const { isHttpUrl } = require('../utils/urlHelpers');
const { makeImage } = require('../utils/announcements/makeImage');
// Library Var
const unlinkAsync = promisify(fs.unlink);

// Setup Multer - local pic storage for Cloudinary

// const upload = multer({ dest: './uploads' });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log('file in destination: ', file);
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const multerUpload = multer({ storage });

// GET - all announcements

router.get('/', (req, res) => {
  // TODO - add query string for options
  Announcement.find({}, (err, announcements) => {
    if (err) return res.status(500).send(err);

    res.status(200).json({ announcements });
  });
});

// GET - one announcement

router.get('/:id', (req, res) => {
  // TODO - add query string for options rollup data, populate, etc.
  const { id } = req.params;

  // Validate

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should be a valid user._id',
    });
  }

  // Get announcement

  Announcement.findById(id, (err, announcement) => {
    if (err) return res.status(500).send(err);

    res.status(200).json({ announcement });
  });
});

// POST - create a new announcement

router.post('/', multerUpload.single('imgFile'), (req, res) => {
  const { createdByUser } = req.query;
  const { description, url } = req.body;

  // Validation

  if (!isHttpUrl(url)) {
    return res.status(400).send({
      error: true,
      _msg:
        'The url field was not a valid url . See the urlFormat field in this response for the valid format.',
      urlFormat: `http://www.domaing.com`,
    });
  }

  // if (createdByUser !== undefined && !ObjectId.isValid(createdByUser)) {
  if (!ObjectId.isValid(createdByUser)) {
    return res.status(400).send({
      error: true,
      _msg: 'The createdByUser field is invalid and should be a valid user._id',
    });
  }

  // TODO validate image props

  // Image

  const imageToSave = makeImage({
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

  cloudinary.v2.uploader.upload(
    req.file.path,
    {
      eager: [{ ...imageToSave.crop.percent, crop: 'crop' }],
    },
    async (err, cloudinaryResult) => {
      await unlinkAsync(req.file.path);

      if (err) {
        return res.status(500).send(err);
      }

      console.log('cloudinaryResult: ', cloudinaryResult);

      imageToSave.cloudinary = {
        eagerUrl: cloudinaryResult.eager[0].url,
        public_id: cloudinaryResult.public_id,
        transformation: cloudinaryResult.eager[0].transformation,
        url: cloudinaryResult.url,
      };

      // Create new Announcement in db

      Announcement.create(
        {
          description,
          image: imageToSave,
          meta: {
            createdByUser,
            updatedByUser: createdByUser,
          },
          url,
        },
        (err, announcement) => {
          if (err) {
            console.log('err: ', err);
            return res.status(500).send(err);
          }

          res.status(201).json({ announcement });
        },
      );
    },
  );
});

// PATCH - update an announcement

router.patch('/:id', (req, res) => {
  const { id, imgUpdate } = req.params;
  const { updatedByUser } = req.query;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id query string param is invalid and should be a valid announcement._id',
    });
  }

  if (!ObjectId.isValid(updatedByUser)) {
    return res.status(400).send({
      error: true,
      _msg: 'The updatedByUser query string param is invalid and should be a valid user._id',
    });
  }

  if (!imgUpdate || !Object.values(IMG_UPDATE).includes(imgUpdate)) {
    return res.status(400).send({
      enumValues: IMG_UPDATE,
      error: true,
      _msg:
        'The imgUpdate field was incorrect. See the enumValues field in this response for possible values.',
    });
  }

  // IF IMGFILE THEN DELETE CLOUDINARY IMG
  // IF NO IMGFILE, DELETE OLD TRANSFORM AND THEN ADD NEW TRANSFORM

  // Update announcement

  Announcement.findById(id, (err, announcementToUpdate) => {
    if (err) return res.status(500).send(err);

    announcementToUpdate.set({
      ...req.body, // TODO need to do validation
      meta: {
        updatedByUser,
      },
    });

    announcementToUpdate.save((err, updatedAnnouncement) => {
      if (err)
        return res
          .status(500)
          .send({ msg: 'An error occurred when attempting to update the announcement.' });

      res.status(200).json({ announcement: updatedAnnouncement.toObject() });
    });
  });
});

// DELETE - an announcement

router.delete('/:id', (req, res) => {
  // TODO - delete event id in other places
  const { id } = req.params;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should be a valid announcement._id',
    });
  }

  // Delete event

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
});

// ??? DO I NEED

router.put('/like', async (req, res) => {
  const { announcementId, userId } = req.body;
  const foundAnnouncement = await Announcement.findById(announcementId).lean();
  const operation = foundAnnouncement.likes.includes(userId) ? '$pull' : '$push';
  Announcement.findByIdAndUpdate(
    announcementId,
    { [operation]: { likes: userId } },
    { new: true },
    (err, updatedAnnouncement) => {
      if (err) return res.status(500).send({ err });

      const data = { announcement: updatedAnnouncement, userId };
      req.app.io.of('/announcements').emit('announcementLikeUpdate', data);
      return res
        .status(200)
        .send({ msg: 'Successfully updated the announcement', updatedAnnouncement });
    },
  );
});

module.exports = router;
