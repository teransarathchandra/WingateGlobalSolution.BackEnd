const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const driverSchema = new Schema({
  driverId: {
    type: String,
    unique: true,
  },
  employeeId: {
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

driverSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('driver');
    this.driverId = `DRIV${nextId}`;
  }
  next();
});

module.exports = model("driver", driverSchema);
