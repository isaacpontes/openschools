const User = require('../models/User');

class UsersService {
  create = (name, role, email, password) => {
    const user = new User({ name, role, email, password });
    return user;
  }

  findAll = async () => {
    const users = await User.find({});
    return users;
  }

  findAllManagers = async () => {
    const users = await User.find({ role: 'manager' });
    return users;
  }

  save = async (user) => {
    await user.save();
    return user;
  }

  findById = async (id) => {
    const user = await User.findById(id);
    return user;
  }

  findByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
  }

  delete = async (id) => {
    await User.findByIdAndRemove(id);
  }
}

module.exports = UsersService;
