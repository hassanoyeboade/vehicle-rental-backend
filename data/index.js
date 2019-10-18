require('dotenv').config({})

const vehicleTypes = require('./vehicle-types');
const transmissionTypes = require('./transmission-types');


module.exports = {
  vehicleTypes,
  currency: process.env.CURRENCY,
  transmissionTypes
}
