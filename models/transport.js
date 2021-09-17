'use strict';

const { Model, DataTypes } = require('sequelize');

class Transport extends Model {
  static init(sequelize) {
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
    
  }
};

module.exports = Transport;
