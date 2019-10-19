'use strict';
const { transmissionTypes, vehicleTypes } = require('../../data')

module.exports = function(sequelize, DataTypes) {
  const Vehicle = sequelize.define('vehicle', {
    plateNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, ]
      }
    },
    transmissionType: {
      type: DataTypes.ENUM(transmissionTypes),
      allowNull: false,
      defaultValue: transmissionTypes[0]
    },
    airConditioned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    canReturnAtDifferentLocation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    bookingPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    extraDetails: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    unlimitedMilesIncluded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    type: {
      type: DataTypes.ENUM(vehicleTypes),
      allowNull: false
    },
  });

  Vehicle.associate = function (models) {
    Vehicle.belongsTo(models.vehicle_rent_type, {as: 'rent_type'})
    Vehicle.belongsTo(models.vehicle_model, {as: 'model'})
    Vehicle.hasMany(models.vehicle_location, {as: 'locations', foreignKey: 'vehicleId'})
    Vehicle.hasMany(models.vehicle_airport, {as: 'airports', foreignKey: 'vehicleId'})
    Vehicle.hasMany(models.vehicle_booking, {as: 'bookings', foreignKey: 'vehicleId'})
  }

  return Vehicle
};
