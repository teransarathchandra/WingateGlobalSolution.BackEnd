const aggType = [
  {
    '$lookup': {
      'from': 'orders',
      'localField': 'orderId',
      'foreignField': 'orderId',
      'as': 'order'
    }
  }, {
    '$unwind': {
      'path': '$order'
    }
  }, {
    '$project': {
      '_id': 1,
      'paymentId': 1,
      'description': 1,
      'amount': 1,
      'paymentMethod': 1,
      'paymentStatus': 1,
      'amountDetail': 1,
      'paymentDate': 1,
      'orderId': '$order.orderId',
      'createdAt': 1
    }
  }
];

const quotationAgg = (id) =>[
  {
    $match: { _id: id }
  },
  {
    '$lookup': {
      'from': 'packagetypes', 
      'localField': 'packageTypeId', 
      'foreignField': '_id', 
      'as': 'package'
    }
  }, {
    '$lookup': {
      'from': 'categories', 
      'localField': 'categoryId', 
      'foreignField': '_id', 
      'as': 'category'
    }
  }, {
    '$unwind': {
      'path': '$package'
    }
  }, {
    '$unwind': {
      'path': '$category'
    }
  }, {
    '$project': {
      '_id': 1, 
      'packageCount': 1, 
      'weight': 1, 
      'packagingCost': '$package.packagingCost', 
      'unitWeightCost': '$category.costPerKilo'
    }
  }
];
module.exports = { aggType, quotationAgg };