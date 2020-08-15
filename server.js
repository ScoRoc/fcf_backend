require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const cookieParser = require('cookie-parser');
const http = require('http').createServer(app);
const io = require('./websocket/sockets').listen(http);
const path = require('path');
// local files
const announcements = require('./routes/announcements');
const auth = require('./routes/auth');
const events = require('./routes/events');
const manager = require('./routes/manager');
const user = require('./routes/user');
const wod = require('./routes/wod');
const wodweek = require('./routes/wodweek');

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fcf_backend', { useNewUrlParser: true, useCreateIndex: true }); // for local dev
mongoose.connect(process.env.FOUNDATION_DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
}); // for heroku deployment

// add this in client package.json for local dev after scripts
// "proxy": "http://localhost:3001",

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.io = io;
// libraries
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// local folders
app.use('/announcements', announcements);
app.use('/auth', auth);
app.use('/events', events);
app.use('/manager', manager);
app.use('/user', user);
app.use('/wod', wod);
app.use('/wodweek', wodweek);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// npm run dev to run in dev mode
const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`)
// });
http.listen(PORT, function () {
  console.log(`Http is listening on port ${PORT}...`);
});

module.exports = app;
