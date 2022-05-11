'use strict';

module.exports = (sequelize, DataTypes) => {
  const AcademicYear = sequelize.define('AcademicYear', {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'academic_years'
  })

  AcademicYear.associate = () => {
    AcademicYear.belongsToMany(sequelize.models.Classroom, {
      foreignKey: 'academic_year_id',
      through: 'enrollments',
      as: 'classrooms'
    });
    AcademicYear.belongsToMany(sequelize.models.Student, {
      foreignKey: 'academic_year_id',
      through: 'enrollments',
      as: 'students'
    });
  }

  return AcademicYear
}
