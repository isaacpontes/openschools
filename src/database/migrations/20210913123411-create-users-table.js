'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
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

      role: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
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

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
