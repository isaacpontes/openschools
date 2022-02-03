const bcrypt = require('bcrypt');
const UserService = require('../services/UserService');

module.exports = {
  authenticate: async (email, password) => {
    const user = await UserService.findByEmail(email)

    if (user) {
      const matched = await bcrypt.compare(password, user.password)

      if (matched) {
        return user
      }
    }

    return false
  },
  cookiePassword: process.env.ADMINJS_COOKIE_PASSWORD
}
