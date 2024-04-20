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
  },
//   {
//     '$project' : {
//         '_id': 1
//     }
//   }
];

const restrictedOrderTypes = [[
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
      ]

];

module.exports = { aggTypeOne, restrictedOrderTypes, aggTypeTwo };