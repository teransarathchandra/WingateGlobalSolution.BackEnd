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
      'paymentDate': 1,
      'orderId': '$order.orderId',
      'createdAt': 1
    }
  }
];
module.exports = { aggType };