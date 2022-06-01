'use strict';

const { Model, DataTypes } = require('sequelize');

class School extends Model {
  static init(sequelize) {
    console.log("initializing...")
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      inep_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'manager' });
    this.hasMany(models.Classroom, { foreignKey: 'school_id', as: 'classrooms' });
  }
}

module.exports = School;
