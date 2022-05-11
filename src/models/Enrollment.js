'use strict';

module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: [[ 'active', 'pending', 'rejected', 'inactive' ]]
      }
    }
  }, {
    tableName: 'enrollments'
  })

  Enrollment.associate = () => {
    Enrollment.belongsTo(sequelize.models.AcademicYear, {
      foreignKey: 'academic_year_id',
      as: 'academicYear'
    });
    Enrollment.belongsTo(sequelize.models.Classroom, {
      foreignKey: 'classroom_id',
      as: 'classroom'
    });
    Enrollment.belongsTo(sequelize.models.Student, {
      foreignKey: 'student_id',
      as: 'student'
    });
  }

  return Enrollment
}
