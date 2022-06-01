'use strict';

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static init(sequelize) {
    console.log("initializing...")
    super.init({
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
    }, { sequelize });

    this.addHook('beforeCreate', async (user) => {
      if (user.isNewRecord || user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    });

    this.addHook('beforeUpdate', async (user) => {
      if (user.isNewRecord || user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    });
  }

  static associate(models) {
    this.hasMany(models.School, { foreignKey: 'user_id', as: 'schools' });
  }

  checkPassword(password, callback) {
    bcrypt.compare(password, this.password, (err, isSame) => {
      if (err)
        callback(err);
      else
        callback(err, isSame);
    });
  }
}

module.exports = User;
