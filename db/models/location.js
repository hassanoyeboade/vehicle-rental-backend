'use strict';

module.exports = function(sequelize, DataTypes) {
  const Location = sequelize.define('location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    mapsLink: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
  });


  Location.associate = function (models) {
    Location.hasMany(models.vehicle_location)
  }

  return Location
};
