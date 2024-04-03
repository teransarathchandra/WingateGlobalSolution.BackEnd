const aggTypeOne = [
    {
        '$lookup': {
            'from': 'countries',
            'localField': 'sendingCountryId',
            'foreignField': '_id',
            'as': 'sendingCountry'
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
            'maxQuantity': 1, 
            'exportLicense': 1, 
            'importPermit': 1, 
            'safetyDataSheets': 1, 
            'phytosanitaryCertificate': 1, 
            'dangerousGoodsDeclaration': 1, 
            'categoryId': '$categoryName.name', 
            'sendingCountryId': '$sendingCountryName.countryCode', 
            'receivingCountryId': '$receivingCountryName.countryCode'
          }
        }
      ]

];

module.exports = { aggTypeOne, restrictedOrderTypes };