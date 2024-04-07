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

const aggTypeTwo = [];

module.exports = { aggTypeOne, aggTypeTwo };