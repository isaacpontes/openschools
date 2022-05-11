'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define('Sector', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'sectors'
  })

  Sector.associate = () => {
    Sector.hasMany(sequelize.models.Employee, {
      foreignKey: 'origin_sector_id',
      as: 'originalEmployees'
    });
    Sector.hasMany(sequelize.models.Employee, {
      foreignKey: 'current_sector_id',
      as: 'currentEmployees'
    });
  }

  return Sector
}
