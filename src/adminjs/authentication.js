const bcrypt = require('bcrypt');
const userService = require('../services/user-service');

module.exports = {
  authenticate: async (email, password) => {
    const user = await userService.findByEmail(email);

    if (user) {
      const matched = await bcrypt.compare(password, user.password);

      if (matched) {
        return user;
      }
    }

    return false;
  },
  cookiePassword: process.env.ADMINJS_COOKIE_PASSWORD
};
