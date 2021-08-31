const User = require('../models/user');

module.exports = {
  create: function (name, role, email, password) {
    const user = new User({ name, role, email, password });
    return user;
  },

  findAll: async function () {
    const users = await User.find({});
    return users;
  },

  save: async function (user) {
    await user.save();
    return user;
  },

  findById: async function (id) {
    const user = await User.findById(id);
    return user;
  },

  findByEmail: async function (email) {
    const user = await User.findOne({ email });
    return user;
  },

  delete: async function (id) {
    await User.findByIdAndRemove(id);
  }
}
