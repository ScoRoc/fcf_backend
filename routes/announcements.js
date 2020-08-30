// Libraries
const multer = require('multer');
const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
// Models
const Announcement = require('../models/announcement');
// Controllers
const {
  deleteAnnouncement,
  getAllAnnouncements,
  getOneAnnouncement,
  patchAnnouncement,
  postAnnouncement,
  viewAnnouncement,
} = require('../controllers/announcements');
// Constants
const { IMG_UPDATE } = require('../constants/enums');
// Helper Functions
const { isHttpUrl } = require('../utils/urlHelpers');

// Setup Multer - local pic storage for Cloudinary

// const upload = multer({ dest: './uploads' });
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    // console.log('file in destination: ', file);
    cb(null, './uploads');
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const multerUpload = multer({ storage });

// GET - all announcements

router.get('/', (req, res) => {
  // TODO - add query string for options
  return getAllAnnouncements(req, res);
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

  return getOneAnnouncement(req, res);
});

// POST - create a new announcement

router.post('/', multerUpload.single('imgFile'), (req, res) => {
  const { createdByUserId } = req.query;
  const { description, url } = req.body;

  // Validation

  if (!description) {
    return res.status(400).send({
      error: true,
      _msg:
        'The description field was invalid. This is a required field and must be of type string.',
    });
  }

  if (!isHttpUrl(url)) {
    return res.status(400).send({
      error: true,
      _msg:
        'The url field was not a valid url . See the urlFormat field in this response for the valid format.',
      urlFormat: `http://www.domaing.com`,
    });
  }

  // if (createdByUserId !== undefined && !ObjectId.isValid(createdByUserId)) {
  if (!ObjectId.isValid(createdByUserId)) {
    return res.status(400).send({
      error: true,
      _msg: 'The createdByUserId field is invalid and should be a valid user._id',
    });
  }

  // TODO validate image props

  return postAnnouncement(req, res);
});

// PATCH - update an announcement

router.patch('/:id', multerUpload.single('imgFile'), (req, res) => {
  const { id } = req.params;
  const { imgUpdate, updatedByUserId } = req.query;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id query string param is invalid and should be a valid announcement._id',
    });
  }

  if (!ObjectId.isValid(updatedByUserId)) {
    return res.status(400).send({
      error: true,
      _msg: 'The updatedByUserId query string param is invalid and should be a valid user._id',
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

  return patchAnnouncement(req, res);
});

// PATCH - update announcement.viewedBy

router.patch('/:id/viewedBy/', async (req, res) => {
  const { id } = req.params;
  const { viewedByUserId } = req.query;

  // Validation

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      error: true,
      _msg: 'The id field is invalid and should a valid announcement._id',
    });
  }

  if (!ObjectId.isValid(viewedByUserId)) {
    return res.status(400).send({
      error: true,
      _msg: 'The viewedByUserId field is invalid and should be a valid user._id',
    });
  }

  return viewAnnouncement(req, res);
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

  return deleteAnnouncement(req, res);
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
