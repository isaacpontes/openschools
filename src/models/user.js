'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['admin', 'manager', 'teacher', 'student']],
          msg: 'Invalid role'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING
  }, {
    tableName: 'users',
    hooks: {
      beforeSave: async (user) => {
        if (user.isNewRecord || user.changed('password')) {
          user.password = await bcrypt.hash(user.password.toString(), 10);
        }
      }
    }
  })

  User.prototype.checkPassword = function (password, callbackfn) {
    bcrypt.compare(password, this.password, (err, isSame) => {
      if (err) {
        callbackfn(err, false)
      } else {
        callbackfn(err, isSame)
      }
    })
  }

  User.associate = () => {
    User.hasMany(sequelize.models.School, {
      foreignKey: 'user_id',
      as: 'schools'
    });
  }

  return User
}