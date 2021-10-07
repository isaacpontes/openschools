require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY;

class JwtService {
  constructor ({ payload, token }) {
    this.payload = payload;
    this.token = token;
  }

  signIn(expiration) {
    this.token = jwt.sign(this.payload, secret, { expiresIn: expiration });
  }

  verifyToken() {
    return jwt.verify(this.token, secret, (err, decoded) => {
      this.payload = !err ? decoded : undefined;
    });
  }
}

module.exports = JwtService;
