'use strict';
const { rentalTypes } = require('../../data')

module.exports = function(sequelize, DataTypes) {
  const VehicleRentType = sequelize.define('vehicle_rent_type', {
    type: {
      type: DataTypes.ENUM(rentalTypes),
      allowNull: false
    },
    doors: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    luggageCapacity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    }
  });

  VehicleRentType.associate = function (models) {
    VehicleRentType.hasMany(models.vehicle);
  }

  return VehicleRentType
};
