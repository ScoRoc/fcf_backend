// Libraries
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
// Models
const User = require('../models/user');
// CONSTANTS
const { TOKEN_DURATION } = require('../constants/globals');

// UPDATE SO ONLY ADMIN CAN LOGIN
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
    if (!user) res.json({ user: null, token: null });

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ error: true, message: 'Email or password is incorrect' });
    }

    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: TOKEN_DURATION });
    res.json({ user: user.toObject(), token });
  });
});

// router.post('/signup', (req, res) => {
//   User.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
//     if (user) res.redirect('/auth/signup'); // DO I NEED TO RETURN THIS ???

//     User.create(
//       {
//         name: req.body.name,
//         email: req.body.email.toLowerCase(),
//         password: req.body.password,
//         numberOfStickies: 0,
//       },
//       function (err, user) {
//         if (err) return res.send(err);

//         const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
//           expiresIn: TOKEN_DURATION,
//         });
//         res.json({ user: user.toObject(), token });
//       },
//     );
//   });
// });

router.post('/validate', (req, res) => {
  const { token } = req.body.token;
  if (!token) res.status(401).json({ message: 'Must pass the token' });

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) res.status(401).send(err);

    User.findById({ _id: user._id }, function (err, user) {
      if (err) res.status(401).send(err);

      res.json({ user: user.toObject(), token });
    });
  });
});

module.exports = router;
