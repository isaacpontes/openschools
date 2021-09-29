'use strict';

const { Model, DataTypes } = require('sequelize');

class Employee extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      employee_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false
      },
      situation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [[
            'Ativo',
            'Cedido',
            'Extraclasse',
            'Licenciado',
            'Permutado',
            'Professor Regente',
            'Readaptado'
          ]]
        }
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bond: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Efetivo', 'Comissionado', 'Contratado', 'Cedido', 'Permutado']]
        }
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rg: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ctps: {
        type: DataTypes.STRING,
        allowNull: false
      },
      elector_title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pis: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fundeb: {
        type: DataTypes.STRING,
        allowNull: false
      },
      admission_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      formation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      complementary_formation: {
        type: DataTypes.STRING,
      },
      workload: {
        type: DataTypes.STRING,
        allowNull: false
      },
      shift: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['morning', 'afternoon', 'night']]
        }
      },
      info: {
        type: DataTypes.TEXT,
      }
    }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.Sector, { foreignKey: 'origin_sector_id', as: 'origin_sector' });
    this.belongsTo(models.Sector, { foreignKey: 'current_sector_id', as: 'current_sector' });
  }
};

module.exports = Employee;
