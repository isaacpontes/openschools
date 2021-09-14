const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'teacher', 'student'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, encryptedPassword) => {
      if (err)
        next(err);
      else {
        this.password = encryptedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isSame) => {
    if (err)
      callback(err);
    else
      callback(err, isSame);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;