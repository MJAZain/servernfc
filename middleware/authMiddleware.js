const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);  // Log the Authorization header

  if (!authHeader) {
    console.error('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('Token missing or malformed');
    return res.status(401).json({ message: 'Token missing or malformed' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.error('Token is not valid:', err);  // Log the error
      return res.status(403).json({ message: 'Token is not valid', error: err });
    }

    req.user = user;
    console.log('User authenticated:', user);  // Log the authenticated user
    next();
  });
};
