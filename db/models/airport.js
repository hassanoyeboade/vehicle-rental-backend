'use strict';

module.exports = function (sequelize, DataTypes) {
  const Airport = sequelize.define('airport', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 3],
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
       type: DataTypes.FLOAT,
      allowNull: true
    },
    mapsLink: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });

  Airport.associate = function (models) {
    Airport.hasMany(models.vehicle)
  }

  return Airport
};
