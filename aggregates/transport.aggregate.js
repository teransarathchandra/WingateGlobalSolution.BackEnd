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
    // },{
    //   '$match': {
    //     'status': 'In Progress'
    //   }
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
    },
  ];

  const aggLastBulk = [
    {
      '$lookup': {
        'from': 'countries', 
        'localField': 'destinationCountry', 
        'foreignField': '_id', 
        'as': 'country'
      }
    }, {
      '$unwind': {
        'path': '$country'
      }
    }, {
      '$project': {
        '_id': 1, 
        'createdAt': 1, 
        'bulkId': 1, 
        '__v': 1, 
        'arrivedTime': 1, 
        'masterAirwayBillId': 1, 
        'flightId': 1,
        'currentLocation': 1, 
        'status': 1, 
        'updatedAt': 1, 
        'destinationCountry': '$country.name'
      }
    },{ $sort: { bulkId: -1 } }, { $limit: 1 }
  ];

  module.exports = { aggType, aggFlight, aggLastBulk };
