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
        
      }
    // },{
    //   '$match': {
    //     'status': 'In Progress'
    //   }
    },{
      '$unwind': {
        'path': '$country'
        
      }
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
    },
    {
        '$lookup': {
            'from': 'countries', 
            'localField': 'arrival', 
            'foreignField': '_id', 
            'as': 'arrivalInfo'
        }
    },
    {
        '$lookup': {
            'from': 'countries', 
            'localField': 'departure', 
            'foreignField': '_id', 
            'as': 'departureInfo'
        }
    },
    {
        '$unwind': {
            'path': '$airlineInfo',
            'preserveNullAndEmptyArrays': true
        }
    },
    {
        '$unwind': {
            'path': '$arrivalInfo',
            'preserveNullAndEmptyArrays': true
        }
    },
    {
        '$unwind': {
            'path': '$departureInfo',
            'preserveNullAndEmptyArrays': true
        }
    },
    {
        '$project': {
            '_id': 1, 
            'flightId': 1, 
            'type': 1, 
            'routeCostPerKilo': 1, 
            'arrival': '$arrivalInfo.name', 
            'arrivalTime': 1, 
            'departure': '$departureInfo.name', 
            'departureTime': 1, 
            'airlineName': '$airlineInfo.name'
        }
    }
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
      '$lookup': {
        'from': 'flights', 
        'localField': 'flightId', 
        'foreignField': '_id', 
        'as': 'flight'
      }
    }, {
      '$sort': {
        'createdAt': -1
      }
    }, {
      '$limit': 1
    }, {
      '$unwind': {
        'path': '$country'
      }
    },
    // {
    //   '$unwind': {
    //     'path': '$flight'
    //   }
    // }, 
    {
      '$project': {
        '_id': 1, 
        'createdAt': 1, 
        'bulkId': 1, 
        '__v': 1, 
        'arrivedTime': 1, 
        'masterAirwayBillId': 1, 
        //'flightId': '$flight.flightId',  
        'currentLocation': 1, 
        'status': 1, 
        'updatedAt': 1, 
        'destinationCountry': '$country.name'
      }
    }
  ];

  const aggOrders = [
    {
      '$lookup': {
        'from': 'receivers', 
        'localField': 'receiverId', 
        'foreignField': '_id', 
        'as': 'receivers'
      }
    }, {
      '$lookup': {
        'from': 'items', 
        'localField': 'itemId', 
        'foreignField': '_id', 
        'as': 'items'
      }
    },{
      '$lookup': {
        'from': 'bulks', 
        'localField': 'bulkId', 
        'foreignField': '_id', 
        'as': 'bulks'
      }
    }, {
      '$match': {
        'receiverId': {
          '$exists': true
        }, 
        'itemId': {
          '$exists': true
        },
        'bulkId': {
          '$exists': false
        }
      }
    }, {
      '$unwind': {
        'path': '$receivers'
      }
    }, {
      '$unwind': {
        'path': '$items'
      }
    }, {
      '$project': {
        '_id': 1, 
        'orderId': 1, 
        'status': 1, 
        'itemId': '$itemId', 
        'itemCategoryId': '$items.categoryId', 
        'weight': '$items.weight', 
        'receiverId': '$receivers._id', 
        'receiverCountryId': '$receivers.countryId', 
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

  const aggOrderInfo = [
    {
      '$lookup': {
        'from': 'packagetypes', 
        'localField': 'packageId', 
        'foreignField': '_id', 
        'as': 'package'
      }
    }, {
      '$lookup': {
        'from': 'bulks', 
        'localField': 'bulkId', 
        'foreignField': '_id', 
        'as': 'bulk'
      }
    }, {
      '$unwind': {
        'path': '$package'
      }
    }, {
      '$unwind': {
        'path': '$bulk'
      }
    }, {
      '$project': {
        '_id': 1, 
        'orderId': 1, 
        'packageCount': 1, 
        'packageId': '$package.packageName', 
        'bulkId': '$bulk.bulkId'
      }
    }
  ];

  const getOrdersByOrderIds = [
    {
      '$lookup': {
        'from': 'bulks', 
        'localField': 'bulkId', 
        'foreignField': '_id', 
        'as': 'bulk'
      }
    }, {
      '$unwind': {
        'path': '$bulk'
      }
    }, {
      '$project': {
        '_id': 1, 
        'orderId': 1, 
        'currentLocation': '$bulk.currentLocation', 
        'arrivedTime': '$bulk.arrivedTime'
      }
    }
  ];


  module.exports = { aggType, aggFlight, aggLastBulk, aggOrders, aggOrderInfo, getOrdersByOrderIds };
