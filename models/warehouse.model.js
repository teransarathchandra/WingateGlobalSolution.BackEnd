const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const warehouseSchema = new Schema(
  {
    warehouseId: {
      type: String,
      unique: true,
    },
    location: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 10,
      unique: true,
    },
    storageCapacity: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
    warehouseManagerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
  },
  { timestamps: true }
);

warehouseSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('warehouse');
    this.warehouseId = `WHS${nextId}`;
  }
  next();
});
module.exports = model("warehouse", warehouseSchema);
