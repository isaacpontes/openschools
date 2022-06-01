'use strict';

const { Model, DataTypes } = require('sequelize');

class Enrollment extends Model {
  static init(sequelize) {
    console.log('initializing...');
    super.init({
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: [[ 'active', 'pending', 'rejected', 'inactive' ]]
        }
      }
    }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.AcademicYear, {
      foreignKey: 'academic_year_id',
      as: 'academic_year'
    });
    this.belongsTo(models.Classroom, {
      foreignKey: 'classroom_id',
      as: 'classroom'
    });
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student'
    });
  }

  readableStatus() {
    switch (this.status) {
    case 'active':
      return 'Ativa';
    case 'pending':
      return 'Pendente';
    case 'rejected':
      return 'Recusada';
    case 'inactive':
      return 'Inativa';
    default:
      return '';
    }
  }
}

module.exports = Enrollment;
