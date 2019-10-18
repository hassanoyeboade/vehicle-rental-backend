'use strict';

module.exports = function(sequelize, DataTypes) {
  const VehicleLocation = sequelize.define('vehicle_location', {

  });

  VehicleLocation.associate =  function (models) {
    VehicleLocation.belongsTo(models.vehicle)
    VehicleLocation.belongsTo(models.location)
  }

  return VehicleLocation
};
