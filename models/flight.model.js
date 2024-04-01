const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");


const flightSchema = new Schema(
  {
    flightId: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
    },
    routeCostPerKilo: {
      type: Number,
    },
    arrival: {
      type: String,
      required: true
    },
    arrivalTime: {
      type: String,
      
    },
    departure: {
        type: String,
        required: true
      },
      departureTime: {
        type: String,
        
      },
    AirlineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "airline",
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = model("flight", flightSchema);
