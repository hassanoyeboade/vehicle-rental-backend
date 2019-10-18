"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.resolve()
      .then(function() {
        return queryInterface.createTable(
          "vehicle_rent_types",
          {
            id: {
              type: "INTEGER",
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            type: { type: "VARCHAR(255)", allowNull: false },
            doors: { type: "INTEGER", allowNull: false },
            seats: { type: "INTEGER", allowNull: false },
            luggageCapacity: { type: "VARCHAR(255)", allowNull: false },
            description: { type: "VARCHAR(255)", allowNull: true },
            createdAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            updatedAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false }
          }
        );
      })

      .then(function() {
        return queryInterface.createTable(
          "vehicle_manufacturers",
          {
            id: {
              type: "INTEGER",
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            name: { type: "VARCHAR(255)", allowNull: false },
            createdAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            updatedAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false }
          }
        );
      })

      .then(function() {
        return queryInterface.createTable(
          "locations",
          {
            id: {
              type: "INTEGER",
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            name: { type: "VARCHAR(255)", allowNull: false },
            latitude: { type: "FLOAT", allowNull: true },
            longitude: { type: "FLOAT", allowNull: true },
            available: {
              type: "BOOLEAN",
              allowNull: false,
              defaultValue: true
            },
            mapsLink: { type: "VARCHAR(255)", allowNull: true },
            createdAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            updatedAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false }
          }
        );
      })

      .then(function() {
        return queryInterface.createTable(
          "airports",
          {
            id: {
              type: "INTEGER",
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            code: { type: "VARCHAR(255)", allowNull: false },
            name: { type: "VARCHAR(255)", allowNull: false },
            latitude: { type: "FLOAT", allowNull: true },
            longitude: { type: "FLOAT", allowNull: true },
            mapsLink: { type: "VARCHAR(255)", allowNull: true },
            available: {
              type: "BOOLEAN",
              allowNull: false,
              defaultValue: true
            },
            createdAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            updatedAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false }
          }
        );
      })

      .then(function() {
        return queryInterface.createTable(
          "vehicle_models",
          {
            id: {
              type: "INTEGER",
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            name: { type: "VARCHAR(255)", allowNull: false },
            createdAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            updatedAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            manufacturerId: {
              type: "INTEGER",
              allowNull: false,
              references: { model: "vehicle_manufacturers", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            }
          }
        );
      })

      .then(function() {
        return queryInterface.createTable(
          "vehicles",
          {
            id: {
              type: "INTEGER",
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            plateNumber: { type: "VARCHAR(255)", allowNull: false,  unique: true },
            transmissionType: { type: "VARCHAR(255)", allowNull: false, defaultValue: "automatic" },
            airConditioned: {
              type: "BOOLEAN",
              allowNull: false,
              defaultValue: true
            },
            canReturnAtDifferentLocation: {
              type: "BOOLEAN",
              allowNull: false,
              defaultValue: false
            },
            imageUrl: { type: "VARCHAR(255)", allowNull: false },
            bookingPrice: { type: "FLOAT", allowNull: false },
            extraDetails: { type: "VARCHAR(255)[]", allowNull: true },
            unlimitedMilesIncluded: {
              type: "BOOLEAN",
              allowNull: false,
              defaultValue: true
            },
            type: { type: "VARCHAR(255)", allowNull: false },
            createdAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            updatedAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            rentTypeId: {
              type: "INTEGER",
              allowNull: true,
              references: { model: "vehicle_rent_types", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            },
            modelId: {
              type: "INTEGER",
              allowNull: true,
              references: { model: "vehicle_models", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            }
          }
        );
      })

      .then(function() {
        return queryInterface.createTable(
          "vehicle_locations",
          {
            id: {
              type: "INTEGER",
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            createdAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            updatedAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            vehicleId: {
              type: "INTEGER",
              allowNull: false,
              references: { model: "vehicles", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            },
            locationId: {
              type: "INTEGER",
              allowNull: false,
              references: { model: "locations", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            }
          }
        );
      })

      .then(function() {
        return queryInterface.createTable(
          "vehicle_bookings",
          {
            id: {
              type: "INTEGER",
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            pickupDate: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            dropOffDate: { type: "TIMESTAMP WITH TIME ZONE", allowNull: true },
            bookedBy: { type: "VARCHAR(255)", allowNull: false },
            createdAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            updatedAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            vehicleId: {
              type: "INTEGER",
              allowNull: true,
              references: { model: "vehicles", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            },
            pickUpLocationId: {
              type: "INTEGER",
              allowNull: true,
              references: { model: "locations", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            },
            dropOffLocationId: {
              type: "INTEGER",
              allowNull: true,
              references: { model: "locations", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            },
            pickUpAirportId: {
              type: "INTEGER",
              allowNull: true,
              references: { model: "airports", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            },
            dropOffAirportId: {
              type: "INTEGER",
              allowNull: true,
              references: { model: "airports", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            }
          }
        );
      })

      .then(function() {
        return queryInterface.createTable(
          "vehicle_airports",
          {
            id: {
              type: "INTEGER",
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            createdAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            updatedAt: { type: "TIMESTAMP WITH TIME ZONE", allowNull: false },
            vehicleId: {
              type: "INTEGER",
              allowNull: false,
              references: { model: "vehicles", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            },
            airportId: {
              type: "INTEGER",
              allowNull: false,
              references: { model: "airports", key: "id" },
              onDelete: "SET NULL",
              onUpdate: "CASCADE"
            }
          }
        );
      });
  },

  down: function(queryInterface, Sequelize) {
    return Promise.resolve()
      .then(function() {
        return queryInterface.dropTable("vehicle_airports");
      })

      .then(function() {
        return queryInterface.dropTable("vehicle_bookings");
      })

      .then(function() {
        return queryInterface.dropTable("vehicle_locations");
      })

      .then(function() {
        return queryInterface.dropTable("vehicles");
      })

      .then(function() {
        return queryInterface.dropTable("vehicle_models");
      })

      .then(function() {
        return queryInterface.dropTable("airports");
      })

      .then(function() {
        return queryInterface.dropTable("locations");
      })

      .then(function() {
        return queryInterface.dropTable("vehicle_manufacturers");
      })

      .then(function() {
        return queryInterface.dropTable("vehicle_rent_types");
      });
  }
};

