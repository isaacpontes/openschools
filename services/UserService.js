const User = require('../models/User');

class UserService {
  static create(name, role, email, password) {
    const user = User.build({ name, role, email, password });
    return user;
  }

  static async findAll() {
    const users = await User.findAll();
    return users;
  }

  static async findAllManagers() {
    const users = await User.findAll({ where: { role: 'manager' }});
    return users;
  }

  static async save(user) {
    await user.save();
    return user;
  }

  static async findById(id) {
    const user = await User.findByPk(id);
    return user;
  }

  static async findByEmail(email) {
    const user = await User.findOne({ where: { email }});
    return user;
  }

  static async deleteOne(id) {
    await User.destroy({ where: { id }});
  }

  static async countAdminUsers() {
    const count = await User.count({
      where: {
        role: 'admin'
      }
    });

    return count;
  }
}

module.exports = UserService;
