'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },

      student_code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      first_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      last_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      gender: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      phone: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      birthday: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },

      birth_place: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      father_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },

      father_ocupation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },

      mother_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },

      mother_ocupation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },

      blood_type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },

      info: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },

      transport_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'transports', key: 'id' },
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

  down: async (queryInterface) => {
    await queryInterface.dropTable('students');
  }
};
