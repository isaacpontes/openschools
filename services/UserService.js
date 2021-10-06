const User = require('../models/User');

class UserService {
  create (name, role, email, password) {
    const user = User.build({ name, role, email, password });
    return user;
  }

  async findAll () {
    const users = await User.findAll();
    return users;
  }

  async findAllManagers () {
    const users = await User.findAll({ where: { role: 'manager' }});
    return users;
  }

  async save (user) {
    await user.save();
    return user;
  }

  async findById (id) {
    const user = await User.findByPk(id);
    return user;
  }

  async findByEmail (email) {
    const user = await User.findOne({ where: { email }});
    return user;
  }

  async delete (id) {
    await User.destroy({ where: { id }});
  }

  async countAdminUsers () {
    const count = await User.count({
      where: {
        role: 'admin'
      }
    });

    return count;
  }
}

module.exports = UserService;
