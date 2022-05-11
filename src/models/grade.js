'use strict';

module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'grades'
  })

  Grade.associate = () => {
    Grade.hasMany(sequelize.models.Classroom, { foreignKey: 'grade_id', as: 'classrooms' });
  }

  return Grade
}