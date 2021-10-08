'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schools', {
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

      inep_code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable('schools');
  }
};
