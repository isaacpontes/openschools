'use strict';

module.exports = (sequelize, DataTypes) => {
  const Classroom = sequelize.define('Classroom', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'classrooms'
  })

  Classroom.associate = () => {
    Classroom.belongsTo(sequelize.models.Grade, { foreignKey: 'grade_id', as: 'grade' });
    Classroom.belongsTo(sequelize.models.School, { foreignKey: 'school_id', as: 'school' });
    Classroom.belongsToMany(sequelize.models.AcademicYear, {
      foreignKey: 'classroom_id',
      through: 'enrollments',
      as: 'academicYears'
    });
    Classroom.belongsToMany(sequelize.models.Student, {
      foreignKey: 'classroom_id',
      through: 'enrollments',
      as: 'students'
    });
  }

  return Classroom
}