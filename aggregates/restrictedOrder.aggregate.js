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

const restrictedOrders = [
  {
    '$match': {
      'status': {
        '$in': [
          'Pending', 'Approved', 'Rejected'
        ]
      }
    }
  }, {
    '$lookup': {
      'from': 'senders', 
      'localField': 'senderId', 
      'foreignField': '_id', 
      'as': 'sender'
    }
  }, {
    '$unwind': {
      'path': '$sender'
    }
  }, {
    '$lookup': {
      'from': 'receivers', 
      'localField': 'receiverId', 
      'foreignField': '_id', 
      'as': 'receiver'
    }
  }, {
    '$unwind': {
      'path': '$receiver'
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'userId', 
      'foreignField': '_id', 
      'as': 'userId'
    }
  }, {
    '$unwind': {
      'path': '$userId'
    }
  }, {
    '$lookup': {
      'from': 'items', 
      'localField': 'itemId', 
      'foreignField': '_id', 
      'as': 'itemId'
    }
  }, {
    '$unwind': {
      'path': '$itemId'
    }
  }, {
    '$lookup': {
      'from': 'categories', 
      'localField': 'itemId.categoryId', 
      'foreignField': '_id', 
      'as': 'categoryId'
    }
  }, {
    '$unwind': {
      'path': '$categoryId'
    }
  }, {
    '$project': {
      '_id': 1, 
      'orderId': 1, 
      'status': 1, 
      'itemId': 1, 
      'sendingCountry': '$sender.address.countryId', 
      'receivingCountry': '$receiver.address.countryId', 
      'isPickupOrder': 1, 
      'priority': 1, 
      'userId': '$userId.userId', 
      'categoryName': '$categoryId.name'
    }
  }
]

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
const restrictedOrderDocumentsByID = (id) => [
  {
    $match: {
      itemId: id
    }
  },
  {
    $lookup: {
      from: "item",  // The collection name in the database that corresponds to the model
      localField: "itemId",
      foreignField: "_id",
      as: "itemDetails"
    }
  },
  {
    $unwind: {
      path: "$itemDetails",
      // preserveNullAndEmptyArrays: true  // Optional: set to false if you always expect a match and want to filter out unmatched results
    }
  },
  {
    $project: {
      documentName: 1,
      documentType: 1,
      folderName: 1,
      documentPath: 1,
      itemName: "$itemDetails.itemName",  // Include item name from the joined `itemDetails`
      itemDescription: "$itemDetails.description",
      itemId: 1
    }
  }
];

// function restrictedOrderDocumentsByID(id) {
//   const objectId = new mongoose.Types.ObjectId(id);
//   console.log(id);
//   return [
//     {
//       '$match': {
//         '_id': objectId
//       }
//     },
//     {
//       '$lookup': {
//         'from': 'countries',
//         'localField': 'sendingCountryId',
//         'foreignField': '_id',
//         'as': 'sendingCountryName'
//       }
//     }, {
//       '$lookup': {
//         'from': 'countries',
//         'localField': 'receivingCountryId',
//         'foreignField': '_id',
//         'as': 'receivingCountryName'
//       }
//     }, {
//       '$lookup': {
//         'from': 'categories',
//         'localField': 'categoryId',
//         'foreignField': '_id',
//         'as': 'categoryName'
//       }
//     }, {
//       '$unwind': {
//         'path': '$sendingCountryName'
//       }
//     }, {
//       '$unwind': {
//         'path': '$receivingCountryName'
//       }
//     }, {
//       '$unwind': {
//         'path': '$categoryName'
//       }
//     }, {
//       '$project': {
//         '_id': 1,
//         'restrictedOrderId': 1,
//         'sendingCountryId': '$sendingCountryName.countryCode',
//         'receivingCountryId': '$receivingCountryName.countryCode',
//         'categoryId': '$categoryName.name',
//         'maxQuantity': 1,
//         'exportLicense': 1,
//         'importPermit': 1,
//         'safetyDataSheets': 1,
//         'phytosanitaryCertificate': 1,
//         'dangerousGoodsDeclaration': 1
//       }
//     }

//   ];
// }

module.exports = { restrictedOrderTypes ,restrictedOrderTypesByID, restrictedOrders , restrictedOrderDocumentsByID};