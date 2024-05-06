const aggType = [
  {
    '$lookup': {
      'from': 'users',
      'localField': 'userId',
      'foreignField': '_id',
      'as': 'user'
    }
  }, {
    '$lookup': {
      'from': 'items',
      'localField': 'itemId',
      'foreignField': '_id',
      'as': 'item'
    }
  }, {
    '$unwind': {
      'path': '$user'
    }
  }, {
    '$unwind': {
      'path': '$item'
    }
  }, {
    '$project': {
      '_id': 1,
      'orderId': 1,
      'email': '$user.email',
      'userId': '$user.userId',
      'itemName': '$item.itemName',
      'description': '$item.description',
      'amount': '$item.itemValue',
      'status': 1,
      'packageCount': 1,
      'orderType': 1,
      'createdAt': 1
    }
  }
];

module.exports = { aggType };