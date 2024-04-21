const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const flightSchema = new Schema(
  {
    flightId: {
      type: String,
      //unique: true,
    },
    type: {
      type: String,
    },
    routeCostPerKilo: {
      type: Number,
    },
    arrival: {
      type: String,
      
    },
    arrivalTime: {
      type: String,
    },
    departure: {
        type: String,
        
      },
      departureTime: {
        type: String,
        
        
      },
    AirlineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "airline",
    },
  },
  { timestamps: true }
);


module.exports = model("flight", flightSchema);
