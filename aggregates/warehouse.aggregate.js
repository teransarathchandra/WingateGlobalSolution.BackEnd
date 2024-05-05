const aggTypeOne = [
  {
    '$lookup': {
      'from': 'orders',
      'localField': 'sendingOrderId',
      'foreignField': '_id',
      'as': 'sendingOrder'
    }
  }, {
    '$lookup': {
      'from': 'countries',
      'localField': 'receivingCountryId',
      'foreignField': '_id',
      'as': 'receivingCountry'
    }
  }, {
    '$unwind': {
      'path': '$sendingCountry'
    }
  }, {
    '$unwind': {
      'path': '$receivingCountry'
    }
  }, {
    '$project': {
      '_id': 0,
      'restrictedOrderId': 1,
      'maxQuantity': 1,
      'exportLicense': 1,
      'importPermit': 1,
      'safetyDataSheets': 1,
      'phytosanitaryCertificate': 1,
      'dangerousGoodsDeclaration': 1,
      'sendingCountry': '$sendingCountry.name',
      'receivingCountry': '$receivingCountry.name'
    }
  }
];

const aggTypeTwo = [
  {
    '$match': {
      'availability': true
    }
  }
]

const pickUpOrders = [
  [
    {
      '$lookup': {
        'from': 'items',
        'localField': 'itemId',
        'foreignField': '_id',
        'as': 'item'
      }
    }, {
      '$unwind': {
        'path': '$item'
      }
    }, {
      '$match': {
        'isPickupOrder': true
      }
    }, {
      '$project': {
        '_id': 1,
        'createdAt': 1,
        'weight': '$item.weight',
        'packageCount': '$item.packageCount'
      }
    }
  ]
]


module.exports = { aggTypeOne, aggTypeTwo, pickUpOrders };