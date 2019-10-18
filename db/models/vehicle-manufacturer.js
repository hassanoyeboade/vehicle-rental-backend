'use strict';

module.exports = function(sequelize, DataTypes) {
  const VehicleManufacturer =  sequelize.define('vehicle_manufacturer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  });

  VehicleManufacturer.associate = function (models) {
    VehicleManufacturer.hasMany(models.vehicle_model, {as: 'models', foreignKey: 'manufacturerId'});
  }

  return VehicleManufacturer;
};
