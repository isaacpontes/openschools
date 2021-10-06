'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      driver: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      info: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transports');
  }
};
