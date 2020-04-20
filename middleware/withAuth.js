// Libraries
const jwt = require('jsonwebtoken');

const withAuth = (req, res, next) => {
  const token = req.cookies.token;

  // Check for token

  if (!token) return res.status(401).send('Unauthorized: No token provided.');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If error

    if (err) return res.status(401).send('Unauthorized: invalid token;');

    // Valid token

    req.email = decoded.email;
    next();
  });
};

module.exports = withAuth;
