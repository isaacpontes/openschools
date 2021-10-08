'use strict';

const { Model, DataTypes } = require('sequelize');

class Student extends Model {
  static init(sequelize) {
    super.init({
      student_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['male', 'female']],
            msg: 'Invalid gender'
          }
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      birth_place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      father_name: {
        type: DataTypes.STRING,
      },
      father_ocupation: {
        type: DataTypes.STRING,
      },
      mother_name: {
        type: DataTypes.STRING,
      },
      mother_ocupation: {
        type: DataTypes.STRING,
      },
      blood_type: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']],
            msg: 'Invalid blood type'
          }
        }
      },
      info: {
        type: DataTypes.TEXT,
      }
    }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.Transport, { foreignKey: 'transport_id', as: 'transport' });
    this.belongsToMany(models.Classroom, {
      foreignKey: 'student_id',
      through: 'enrollments',
      as: 'classrooms'
    });
    this.belongsToMany(models.AcademicYear, {
      foreignKey: 'student_id',
      through: 'enrollments',
      as: 'academicYears'
    });
  }

  enrolled() {
    const enrolled = this.academicYears.filter(academicYear => academicYear.year === new Date().getFullYear())

    if (enrolled[0]) {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = Student;
