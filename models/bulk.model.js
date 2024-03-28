const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");


const bulkSchema = new Schema(
  {
    bulkId: {
      type: String,
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
      enum: ["In Progress", "Completed"],
    },
    destinationCountry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "flight",
      required: true,
    },
    masterAirwayBillId: {
      type: String,
    },
  },
  { timestamps: true }
);

bulkSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('bulk');
    this.bulkId = `BLK${nextId}`;
  }
  next();
});

module.exports = model("bulk", bulkSchema);
