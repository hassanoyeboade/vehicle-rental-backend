import _ from 'lodash';

import data from '../../../data';
import models from '../../../db/models';
import validate, {schemas} from "../../services/validator"
import Sequelize from "sequelize"

export default class VehicleController {

  static async getAll(req, res, next) {
    const vehicles = (await models.vehicle.findAll({
      include: [
        {
          model: models.vehicle_rent_type,
          as: 'rent_type'
        },
        {
          model: models.vehicle_model,
          as: 'model'
        }
      ]
    }));
    return res.json({data: vehicles})
  }

  static async search(req, res, next) {
    const locationNames = (await models.location.findAll({
      attributes: ['name']
    })).map((r) => r.name)
    const airportCodes = (await models.airport.findAll({
      attributes: ['code']
    })).map((r) => r.code)

    const {isValid, errors} = validate(req.query, schemas.vehicleSearchQuery({
      locationNames,
      airportCodes,
      payload: req.query
    }));

    if (!isValid) {
      return res.status(400).json({
        errors
      })
    }

    const {
      airport, location, pickUpDate, dropOffDate, rentalType, // required
      pricesRange, manufacturers, passengersRange, vehicleTypes, returnAtDifferentLocation
    } = req.query;

    const where = {};
    const include = [];

    // check if vehicle is available at airport
    if (airport) {
      where['$airports.airport.code$'] = airport;
      include.push({
        model: models.vehicle_airport,
        as: 'airports',
        include: [{
          model: models.airport
        }]
      })
    }

    // check if vehicle is available at location
    if (location) {
      where['$locations.location.name$'] = location;
      include.push({
        model: models.vehicle_location,
        as: 'locations',
        include: [{
          model: models.location
        }]
      })
    }

    // rentalType
    where['$rent_type.type$'] = rentalType;
    include.push({
      model: models.vehicle_rent_type,
      as: 'rent_type'
    })

    // pickUpDate

    // dropOffDate

    // vehicleTypes
    if (vehicleTypes) {
      where.type = Array.isArray(vehicleTypes) ? vehicleTypes : vehicleTypes.split(",");
    }

    // returnAtDifferentLocation
    const canReturnAtDifferentLocation = _.intersection(['true', 'false'], returnAtDifferentLocation)
    if (canReturnAtDifferentLocation.length) {
      where['canReturnAtDifferentLocation'] = canReturnAtDifferentLocation;
    }

    // pricesRange
    if (pricesRange) {
      let prices = pricesRange.split(",");
      if (prices.length === 2) {
        where.bookingPrice = {
          [models.Sequelize.Op.between]: [prices[0], prices[1]]
        }
      }
    }

    const vehicles = await models.vehicle.findAll({
      where,
      include
    });

    return res.json({
      data: vehicles
    })
  }

  static async getData(req, res, next) {
    const airports = (await models.airport.findAll({
      attributes: ['code']
    })).map((r) => r.code)
    const locations = (await models.location.findAll({
      attributes: ['name']
    })).map((r) => r.name)
    const bookingPriceRange = (await models.vehicle.findAll({
      attributes: [
        [models.sequelize.fn('min', models.sequelize.col('bookingPrice')), 'minimum'],
        [models.sequelize.fn('max', models.sequelize.col('bookingPrice')), 'maximum']
      ],
      raw: true
    }))[0];
    const manufacturers = (await models.vehicle_manufacturer.findAll({
      attributes: ['name']
    })).map((r) => r.name)
    const passengerSeatsRange = (await models.vehicle_rent_type.findAll({
      attributes: [
        [models.sequelize.fn('min', models.sequelize.col('seats')), 'minimum'],
        [models.sequelize.fn('max', models.sequelize.col('seats')), 'maximum']
      ],
      raw: true
    }))[0];

    return res.json({
      ...data,
      airports,
      locations,
      manufacturers,
      bookingPriceRange,
      passengerSeatsRange
    })
  }
}
