const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const driverSchema = new Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "warehouse",
    required: true,
  },
});

module.exports = model("driver", driverSchema);
