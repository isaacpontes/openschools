'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employees', {
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
      employee_code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      birthday: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      situation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      position: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      bond: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      rg: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      ctps: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      elector_title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      pis: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      fundeb: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      admission_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      formation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      complementary_formation: {
        type: Sequelize.DataTypes.STRING,
      },
      workload: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      shift: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      origin_sector_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'sectors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      current_sector_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'sectors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      info: {
        type: Sequelize.DataTypes.TEXT,
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
    await queryInterface.dropTable('employees');
  }
};
