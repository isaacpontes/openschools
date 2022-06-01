'use strict';

const { Model, DataTypes } = require('sequelize');

class Transport extends Model {
  static init(sequelize) {
    console.log('initializing...');
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      driver: {
        type: DataTypes.STRING,
        allowNull: false
      },
      info: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, { sequelize });
  }

  static associate(models) {
    this.hasMany(models.Student, { foreignKey: 'transport_id', as: 'transports' });
  }
}

module.exports = Transport;
