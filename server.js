// Libraries
require('dotenv').config();
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const cookieParser = require('cookie-parser');
const express = require('express');
// const http = require('http').createServer(app);
const httpLib = require('http');
const mongoose = require('mongoose');
const path = require('path');
// Routes
const announcements = require('./routes/announcements');
const auth = require('./routes/auth');
const events = require('./routes/events');
const sockets = require('./websocket/sockets');
const user = require('./routes/user');
const wod = require('./routes/wod');

// App Declarations

const app = express();
const http = httpLib.createServer(app);
const io = sockets.listen(http);

app.io = io
// Libraries
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Local Folders
app.use('/announcements', announcements);
app.use('/auth', auth);
app.use('/events', events);
app.use('/users', user);
app.use('/wods', wod);
// https://app.swaggerhub.com/home - ToDo complete Swagger

// Mongoose

mongoose.connect('mongodb://localhost/fcf_backend', { useNewUrlParser: true, useCreateIndex: true }); // for local dev
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });  // for heroku deployment

// Cloudinary

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

// For buildling portal...need to move to separate repo

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Run Server

// add this in client package.json for local dev after scripts
// "proxy": "http://localhost:3001",

// npm run dev to run in dev mode
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`)
});
// http.listen(PORT, function() {
//   console.log(`Http is listening on port ${PORT}...`)
// });


module.exports = app;
