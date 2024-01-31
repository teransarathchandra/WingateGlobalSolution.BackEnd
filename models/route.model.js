const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const routeSchema = new Schema(
  {
    routeId: {
      type: Number,
      required: true,
      unique: true,
    },
    transportMode: {
      type: String,
      required: true,
      maxLength: 10,
      unique: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    roundTripDays: {
      type: Number,
      required: true,
    },
    routeShippingCost: {
      type: Number,
      required: true,
    },
    startingPortId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "port",
      required: true,
    },
    endingPortId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "port",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("route", routeSchema);
