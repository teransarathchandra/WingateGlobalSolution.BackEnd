const aggType = [
    {
      '$project': {
        '_id': 1,
        'customerId': 1,
        'email': 1,
        'name.firstName': 1, 
        'name.lastName': 1
      }
    }
  ];

  module.exports = { aggType }; 