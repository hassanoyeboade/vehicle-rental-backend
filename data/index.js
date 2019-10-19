require('dotenv').config({})

const vehicleTypes = require('./vehicle-types');
const rentalTypes = require('./rental-types');
const transmissionTypes = require('./transmission-types');


module.exports = {
  rentalTypes,
  vehicleTypes,
  currency: process.env.CURRENCY,
  transmissionTypes
}
