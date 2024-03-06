const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const vehicleSchema = new Schema(
  {
    vehicleId: {
      type: String,
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

vehicleSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('vehicle');
    this.vehicleId = `VHCL${nextId}`;
  }
  next();
});
module.exports = model("vehicle", vehicleSchema);
