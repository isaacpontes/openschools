'use strict';

const { Model, DataTypes } = require('sequelize');

class Sector extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { sequelize });
  }

  static associate(models) {
    this.hasMany(models.Employee, { foreignKey: 'origin_sector_id', as: 'original_employees' });
    this.hasMany(models.Employee, { foreignKey: 'current_sector_id', as: 'current_employees' });
  }
}

module.exports = Sector;
