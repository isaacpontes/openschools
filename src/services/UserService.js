const User = require('../models/User');

module.exports = {
  create: (name, role, email, password) => {
    const user = User.build({ name, role, email, password });
    return user;
  },

  findAll: async () => {
    const users = await User.findAll();
    return users;
  },

  findAllManagers: async () => {
    const users = await User.findAll({ where: { role: 'manager' }});
    return users;
  },

  save: async (user) => {
    await user.save();
    return user;
  },

  findById: async (id) => {
    const user = await User.findByPk(id);
    return user;
  },

  findByEmail: async (email) => {
    const user = await User.findOne({ where: { email }});
    return user;
  },

  deleteOne: async (id) => {
    await User.destroy({ where: { id }});
  },

  countAdminUsers: async () => {
    const count = await User.count({
      where: {
        role: 'admin'
      }
    });

    return count;
  }
}
