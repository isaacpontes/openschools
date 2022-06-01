'use strict';

const { Model, DataTypes } = require('sequelize');

class AcademicYear extends Model {
  static init(sequelize) {
    console.log("initializing...")
    super.init({
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, { sequelize, modelName: 'academic_years' });
  }

  static associate(models) {
    this.belongsToMany(models.Classroom, {
      foreignKey: 'academic_year_id',
      through: 'enrollments',
      as: 'classrooms'
    });
    this.belongsToMany(models.Student, {
      foreignKey: 'academic_year_id',
      through: 'enrollments',
      as: 'students'
    });
  }
}

module.exports = AcademicYear;
