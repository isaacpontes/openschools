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
    this.belongsToMany(models.AcademicYear, {
      foreignKey: 'classroom_id',
      through: 'enrollments',
      as: 'academic_years'
    });
    this.belongsToMany(models.Student, {
      foreignKey: 'classroom_id',
      through: 'enrollments',
      as: 'students'
    });
  }
};

module.exports = Classroom;
