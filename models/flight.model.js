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
      type: Date,
      
    },
    departure: {
        type: String,
        required: true
      },
      departureTime: {
        type: Date,
        
      },
    AirlineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "airline",
      required: true,
    },
  },
  { timestamps: true }
);

flightSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('flight');
    this.flightId = `FLIGHT${nextId}`;
  }
  next();
});

module.exports = model("flight", flightSchema);
