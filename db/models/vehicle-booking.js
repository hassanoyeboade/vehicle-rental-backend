'use strict';

module.exports = function(sequelize, DataTypes) {
  const VehicleBooking =  sequelize.define('vehicle_booking', {
    pickupDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dropOffDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    bookedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  VehicleBooking.associate = function (models) {
    VehicleBooking.belongsTo(models.vehicle)
    VehicleBooking.belongsTo(models.location, {as: 'pickUpLocation'})
    VehicleBooking.belongsTo(models.location, {as: 'dropOffLocation'})
    VehicleBooking.belongsTo(models.airport, {as: 'pickUpAirport'})
    VehicleBooking.belongsTo(models.airport, {as: 'dropOffAirport'})

  }

  return VehicleBooking
};
