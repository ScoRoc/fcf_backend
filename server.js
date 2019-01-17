require('dotenv').config();
const express = require('express');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fcf_backend', { useNewUrlParser: true, useCreateIndex: true }); // for local dev
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });  // for heroku deployment

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const announcements = require('./routes/announcements');
const auth = require('./routes/auth');
const events = require('./routes/events');
const manager = require('./routes/manager');
const wod = require('./routes/wod');

app.use('/announcements', announcements);
app.use('/auth', auth);
app.use('/events', events);
app.use('/manager', manager);
app.use('/wod', wod);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// dummy route to add super user
router.post('/super', async (req, res) => {
  const superInfo = {
    firstName: 'super',
    lastName: 'user',
    email: 'super@super.com',
    superUser: true,
    password: 'password',
  };
  if ( await findManagerByEmail(superInfo.email) ) {
    res.send({errors: true, _message: 'There is already a user with that email.'});
  } else {
    Manager.create(superInfo, (err, manager) => {
      if (err) {
        console.log('err: ', err);
        res.send(err);
      } else {
        res.send('created');
        // res.json({ manager: manager.toObject(), managerPassword: password });
      }
    });
  }
});

// npm run dev to run in dev mode
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

module.exports = app;
