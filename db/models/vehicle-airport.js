'use strict';

module.exports = function(sequelize, DataTypes) {
  const VehicleAirport = sequelize.define('vehicle_airport', {

  });

  VehicleAirport.associate =  function (models) {
    VehicleAirport.belongsTo(models.vehicle)
    VehicleAirport.belongsTo(models.airport);
  }

  return VehicleAirport
};
