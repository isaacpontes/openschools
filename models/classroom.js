'use strict';

const { Model, DataTypes } = require('sequelize');

class Classroom extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.Grade, { foreignKey: 'grade_id', as: 'grade' });
    this.belongsTo(models.School, { foreignKey: 'school_id', as: 'school' });
  }
};

module.exports = Classroom;
