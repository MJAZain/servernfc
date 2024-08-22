const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

// Register endpoint
exports.register = (req, res) => {
  const { name, email, company, position, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password', error: err });
    }

    const query = 'INSERT INTO user SET ?';
    const data = { name, email, company, position, password: hash };

    db.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error inserting user into database', error: err });
      } else {
        const token = jwt.sign(
          { id: result.insertId, name, email, company, position },
          jwtSecret,
          { expiresIn: jwtExpiresIn }
        );
        return res.json({ token });
      }
    });
  });
};

// Login endpoint
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM user WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error querying database', error: err });
    } else if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords', error: err });
      } else if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, company: user.company, position: user.position },
        jwtSecret,
        { expiresIn: jwtExpiresIn }
      );
      return res.json({ token });
    });
  });
};
