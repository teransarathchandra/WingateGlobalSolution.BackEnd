const mongoose = require('mongoose');

const restrictedOrderTypes = [
  {
    '$lookup': {
      'from': 'countries',
      'localField': 'sendingCountryId',
      'foreignField': '_id',
      'as': 'sendingCountryName'
    }
  }, {
    '$lookup': {
      'from': 'countries',
      'localField': 'receivingCountryId',
      'foreignField': '_id',
      'as': 'receivingCountryName'
    }
  }, {
    '$lookup': {
      'from': 'categories',
      'localField': 'categoryId',
      'foreignField': '_id',
      'as': 'categoryName'
    }
  }, {
    '$unwind': {
      'path': '$sendingCountryName'
    }
  }, {
    '$unwind': {
      'path': '$receivingCountryName'
    }
  }, {
    '$unwind': {
      'path': '$categoryName'
    }
  }, {
    '$project': {
      '_id': 1,
      'restrictedOrderId': 1,
      'sendingCountryId': '$sendingCountryName.countryCode',
      'receivingCountryId': '$receivingCountryName.countryCode',
      'categoryId': '$categoryName.name',
      'maxQuantity': 1,
      'exportLicense': 1,
      'importPermit': 1,
      'safetyDataSheets': 1,
      'phytosanitaryCertificate': 1,
      'dangerousGoodsDeclaration': 1
    }
  }
];

function restrictedOrderTypesByID(id) {
  const objectId = new mongoose.Types.ObjectId(id);
  console.log(id);
  return [
    {
      '$match': {
        '_id': objectId
      }
    },
    {
      '$lookup': {
        'from': 'countries',
        'localField': 'sendingCountryId',
        'foreignField': '_id',
        'as': 'sendingCountryName'
      }
    }, {
      '$lookup': {
        'from': 'countries',
        'localField': 'receivingCountryId',
        'foreignField': '_id',
        'as': 'receivingCountryName'
      }
    }, {
      '$lookup': {
        'from': 'categories',
        'localField': 'categoryId',
        'foreignField': '_id',
        'as': 'categoryName'
      }
    }, {
      '$unwind': {
        'path': '$sendingCountryName'
      }
    }, {
      '$unwind': {
        'path': '$receivingCountryName'
      }
    }, {
      '$unwind': {
        'path': '$categoryName'
      }
    }, {
      '$project': {
        '_id': 1,
        'restrictedOrderId': 1,
        'sendingCountryId': '$sendingCountryName.countryCode',
        'receivingCountryId': '$receivingCountryName.countryCode',
        'categoryId': '$categoryName.name',
        'maxQuantity': 1,
        'exportLicense': 1,
        'importPermit': 1,
        'safetyDataSheets': 1,
        'phytosanitaryCertificate': 1,
        'dangerousGoodsDeclaration': 1
      }
    }

  ];
}

module.exports = { restrictedOrderTypes, restrictedOrderTypesByID };