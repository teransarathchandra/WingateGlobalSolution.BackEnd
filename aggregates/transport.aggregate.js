const aggType = [
    {
      '$lookup': {
        'from': 'flights', 
        'localField': 'flightId', 
        'foreignField': '_id', 
        'as': 'flightInfo'
      }
    },
    {
      '$lookup': {
        'from': 'countries', 
        'localField': 'destinationCountry', 
        'foreignField': '_id', 
        'as': 'country'
      }
    }, {
      '$unwind': {
        'path': '$flightInfo',
        'path': '$country'
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
        'destinationCountry': '$country.name',
        'status': 1,
        'arrivedTime': 1,
        'currentLocation': 1,
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
    },{
      '$lookup': {
        'from': 'flights', 
        'localField': 'flightId', 
        'foreignField': '_id', 
        'as': 'flight'
      }
    }, {
      '$unwind': {
        'path': '$country',
        'path': '$flight'
      }
    }, {
      '$project': {
        '_id': 1, 
        'createdAt': 1, 
        'bulkId': 1, 
        '__v': 1, 
        'arrivedTime': 1, 
        'masterAirwayBillId': 1, 
        'flightId': '$flight.flightId', 
        '_id': 1, 
        'currentLocation': 1, 
        'status': 1, 
        'updatedAt': 1, 
        'destinationCountry': '$country.name'
      }
    },{ $sort: { bulkId: -1 } }, { $limit: 1 }
  ];

  const aggOrders = [
    {
        '$lookup': {
          'from': 'receivers',
          'localField': 'receiverId',
          'foreignField': '_id',
          'as': 'receiver'
        }
    },
    {
        '$lookup': {
          'from': 'items',
          'localField': 'itemId',
          'foreignField': '_id',
          'as': 'item'
        }
    },
    {
        '$match': {
            'receiver': { '$ne': [] },
            'item': { '$ne': [] }
        }
    },
    {
        '$unwind': '$receiver'
    },
    {
        '$unwind': '$item'
    },
    {
        '$project': {
            '_id': 1,
            'orderId': 1,
            'status': 1,
            'itemId': '$itemId',
            'itemCategoryId': '$item.categoryId',
            'weight': '$item.weight',
            'receiverId': '$receiver._id',
            'receiverCountryId': '$receiver.countryId',
            'packageCount': 1,
            'userId': 1,
            'routeId': 1,
            'stockId': 1,
            'packageId': 1,
            'priority': 1,
            'createdAt': 1,
            'updatedAt': 1,
            '__v': 1
        }
    }
];


  module.exports = { aggType, aggFlight, aggLastBulk, aggOrders };
