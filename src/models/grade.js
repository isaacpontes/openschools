'use strict';

const { Model, DataTypes } = require('sequelize');

class Grade extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { sequelize });
  }

  static associate(models) {
    this.hasMany(models.Classroom, { foreignKey: 'grade_id', as: 'classrooms' });
  }
}

module.exports = Grade;
