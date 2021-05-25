require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY;

module.exports = {
  verifyToken: (token) => {
    return jwt.verify(token, secret, (err, decoded) => {
      if (err)
        return false;
      else
        return decoded.email;
    });
  },
  signIn: (payload, expiration) => {
    return jwt.sign(payload, secret, { expiresIn: expiration });
  }
}

