import _ from 'lodash';

const stringAndRequired = {
  minLength: 1,
  required: true,
  type: "string"
};

const stringAndNotRequired = {
  ...stringAndRequired,
  required: false
};

const enumRequired = (values) => ({...stringAndRequired, enum: values})
const enumAndNotRequired = (values) => ({...stringAndNotRequired, enum: values})

const dateAndRequired = {
  format: 'date-time',
  ...stringAndRequired
}

const numberAndRequired = {
  minimum: 1,
  required: true,
  type: "number"
};

const numberAndNotRequired = {
  ...numberAndRequired,
  required: false
};

const conformToOneOf = (allowed) => {
  return {
    conform: (value) => {
      return value ? allowed.includes(value) : true;
    },
    messages: {
      conform: `is not valid. Must be one of ${allowed.join(", ")}`
    }
  }
};
// airport, location, pickUpDate, dropOffDate, rentalType // required

export const vehicleSearchQuery = ({airportCodes, locationNames, payload}) => {
  const airport = enumRequired(airportCodes);
  const location = enumRequired(locationNames);

  let properties = {
    // pickUpDate: dateAndRequired,
    // dropOffDate: dateAndRequired,
    rentalType: stringAndRequired
  }

  if (payload.airport) {
    properties = _.merge(properties, {airport})
  } else if (payload.location) {
    properties = _.merge(properties, {location})
  } else {
    properties = _.merge(properties, {
      airport,
      location
    })
  }

  return {
    properties
  }
}
