require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fcf_backend', { useNewUrlParser: true, useCreateIndex: true }); // for local dev
// mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});  // for heroku deployment

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/test', (req, res) => {
  res.send('working')
});

const auth = require('./routes/auth');
const manager = require('./routes/manager');

app.use('/auth', auth);
app.use('/manager', manager);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })
}

// npm run dev to run in dev mode
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

module.exports = app;
