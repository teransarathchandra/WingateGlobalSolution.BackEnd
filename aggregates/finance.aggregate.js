const aggType = [
    {
      '$lookup': {
        'from': 'orders', 
        'localField': 'orderId', 
        'foreignField': '_id', 
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
        'paymentDescription': 1, 
        'amount': 1, 
        'paymentMethod': 1, 
        'paymentStatus': 1, 
        'orderId': '$order.orderId', 
        'createdAt': 1
      }
    }
  ];
  module.exports =  {aggType};