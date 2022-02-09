require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY;

module.exports = {
  signPayload: (payload, expiration) => {
    return jwt.sign(payload, secret, { expiresIn: expiration })
  },
  verifyToken: (token) => {
    return jwt.verify(token, secret)
  }
};
