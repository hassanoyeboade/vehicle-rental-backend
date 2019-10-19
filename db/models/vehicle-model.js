'use strict';

module.exports = function (sequelize, DataTypes) {
  const VehicleModel = sequelize.define('vehicle_model', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  VehicleModel.associate = function (models) {
    VehicleModel.belongsTo(models.vehicle_manufacturer, {as: 'manufacturer'});
    VehicleModel.hasMany(models.vehicle, {as: 'vehicles', foreignKey: 'modelId'})
  }

  return VehicleModel;
};
