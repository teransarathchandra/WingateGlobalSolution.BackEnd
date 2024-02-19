const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const vehicleSchema = new Schema(
  {
    vehicleId: {
      type: Number,
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      enum: ["Cargo Plane", "Vessel Ship"],
    },
    availability: {
      type: Boolean,
      required: true,
    },
    vehicleAssignedDate: {
      type: Date,
      required: true,
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "route",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("vehicle", vehicleSchema);
