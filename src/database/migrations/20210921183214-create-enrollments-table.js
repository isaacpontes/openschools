'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('enrollments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      status: Sequelize.DataTypes.STRING,
      student_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      classroom_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'classrooms', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      academic_year_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'academic_years', key: 'id' },
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
    await queryInterface.dropTable('enrollments');
  }
};
