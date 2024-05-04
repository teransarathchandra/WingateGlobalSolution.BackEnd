const aggType = [
  {
    $lookup: {
      from: "systemAccess",
      localField: "accessLevel",
      foreignField: "_id",
      as: "systemAccess",
    },
  },
  {
    $unwind: {
      path: "$systemAccess",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $project: {
      employeeId: 1,
      focus: 1,
      createdAt: 1,
      password: 1,
      __v: 1,
      "name.firstName": 1,
      "name.lastName": 1,
      "address.street": 1,
      "address.city": 1,
      "address.state": 1,
      "address.country": 1,
      contactNumber: 1,
      _id: 1,
      email: 1,
      refreshToken: 1,
      updatedAt: 1,
      accessDescription:
        "$systemAccess.description",
      accessID: "$systemAccess.accessLevelId",
    },
  },
]

module.exports = { aggType };