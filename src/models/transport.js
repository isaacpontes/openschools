'use strict';

module.exports = (sequelize, DataTypes) => {
  const Transport = sequelize.define('Transport', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    driver: {
      type: DataTypes.STRING,
      allowNull: false
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'transports'
  })

  Transport.associate = () => {
    Transport.hasMany(sequelize.models.Student, {
      foreignKey: 'transport_id',
      as: 'transports'
    });
  }

  return Transport
}