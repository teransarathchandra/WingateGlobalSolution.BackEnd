// Import mongoose at the top of your file
const mongoose = require('mongoose');

// Wrap the pipeline in a function that accepts userId as an argument
function getUserOrdersAggregation(userId) {
  return [
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'userId', 
        'foreignField': '_id', 
        'as': 'userDetails'
      }
    },
    {
      '$match': {
        // Use the userId argument to dynamically match documents
        'userId': new mongoose.Types.ObjectId(userId)
      }
    },
    {
      '$unwind': {
        'path': '$userDetails',
        'preserveNullAndEmptyArrays': true
      }
    },
    {
      '$project': {
        '_id': 1, 
        'orderId': 1, 
        'createdAt': 1, 
        'status': 1,
        'userId': '$userDetails.userId'
      }
    }
  ];
}

// Export the function instead of a static array
module.exports = { getUserOrdersAggregation };
