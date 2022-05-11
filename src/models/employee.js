'use strict';

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
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
        isIn: [[
          'morning',
          'afternoon',
          'night',
          'morning-afternoon',
          'afternoon-night',
          'morning-night'
        ]]
      }
    },
    origin_sector_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'sectors', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    current_sector_id: {
      type: DataTypes.INTEGER,
      references: { model: 'sectors', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    info: {
      type: DataTypes.TEXT,
    }
  }, {
    tableName: 'employees'
  })

  Employee.associate = () => {
    Employee.belongsTo(sequelize.models.Sector, { foreignKey: 'origin_sector_id', as: 'originSector' });
    Employee.belongsTo(sequelize.models.Sector, { foreignKey: 'current_sector_id', as: 'currentSector' });
  }

  return Employee
}
