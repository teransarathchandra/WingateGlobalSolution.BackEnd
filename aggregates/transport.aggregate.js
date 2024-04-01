const aggType = [
    {
      '$lookup': {
        'from': 'flights', 
        'localField': 'flightId', 
        'foreignField': '_id', 
        'as': 'flightInfo'
      }
    }, {
      '$unwind': {
        'path': '$flightInfo'
      }
    }, {
      '$project': {
        '_id': 1, 
        'bulkId': 1, 
        'masterAirwayBillId': 1, 
        'flightId': '$flightInfo.flightId'
      }
    }
  ];

  const aggFlight = [
    {
      '$lookup': {
        'from': 'airlines', 
        'localField': 'AirlineId', 
        'foreignField': '_id', 
        'as': 'airlineInfo'
      }
    }, {
      '$unwind': {
        'path': '$airlineInfo'
      }
    }, {
      '$project': {
        '_id': 1, 
        'flightId': 1, 
        'type': 1, 
        'routeCostPerKilo': 1, 
        'arrival': 1, 
        'arrivalTime': 1, 
        'departure': 1, 
        'departureTime': 1, 
        'airlineName': '$airlineInfo.name'
      }
    }
  ];

  module.exports = { aggType, aggFlight };
