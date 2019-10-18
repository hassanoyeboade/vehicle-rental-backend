'use strict';
const _ = require('lodash');

const models = require("../models")
const seedData = require('./seed_data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.resolve()
      .then(function () {
        // airports
        return queryInterface.bulkInsert('airports', seedData.airports.map(function (r) {
          r.createdAt = r.updatedAt = new Date();
          return r;
        }));
      })
      .then(function () {
        // locations
        return queryInterface.bulkInsert('locations', seedData.locations.map(function (r) {
          r.createdAt = r.updatedAt = new Date();
          return r;
        }));
      })
      .then(function () {
        // rent types
        return queryInterface.bulkInsert('vehicle_rent_types', seedData.rentTypes.map(function (r) {
          r.createdAt = r.updatedAt = new Date();
          return r;
        }));
      })
      .then(function () {
        // manufacturers
        return queryInterface.bulkInsert('vehicle_manufacturers', seedData.manufacturers.map(function (r) {
          r.createdAt = r.updatedAt = new Date();
          return r;
        }));
      })
      .then(async function() {
        // models
        const manufacturers = await models.vehicle_manufacturer.findAll();
        const manufacturersNamesByIds = _.chain(manufacturers).keyBy('name').mapValues('id').value();

        return queryInterface.bulkInsert('vehicle_models', seedData.models.map(function (r) {
          r.manufacturerId = manufacturersNamesByIds[r.manufacturerName]
          r.createdAt = r.updatedAt = new Date();
          delete r.manufacturerName;
          return r;
        }));
      })
      .then(async function() {
        // vehicles
        const rentTypes = await models.vehicle_rent_type.findAll();
        const vehicleModels = await models.vehicle_model.findAll();
        const rentTypesByIds = _.chain(rentTypes).keyBy('type').mapValues('id').value();
        const vehicleModelsByIds = _.chain(vehicleModels).keyBy('name').mapValues('id').value();

        return queryInterface.bulkInsert('vehicles', seedData.vehicles.map(function (r) {
          r.modelId = vehicleModelsByIds[r.modelName]
          r.rentTypeId = rentTypesByIds[r.rentalType]
          r.createdAt = r.updatedAt = new Date();
          delete r.modelName;
          delete r.rentalType;
          return r;
        }));
      })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve();
  }
};
