'use strict';

module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
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
  }, {
    tableName: 'schools'
  })

  School.associate = () => {
    School.belongsTo(sequelize.models.User, {
      foreignKey: 'user_id',
      as: 'manager'
    });
    School.hasMany(sequelize.models.Classroom, {
      foreignKey: 'school_id',
      as: 'classrooms'
    });
  }

  return School
}