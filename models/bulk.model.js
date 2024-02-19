const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bulkSchema = new Schema(
  {
    bulkId: {
      type: Number,
      required: true,
      unique: true,
    },
    currentLocation: {
      type: String,
    },
    arrivedTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ["In Progress", "Arrived", "Delivered"],
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("bulk", bulkSchema);
