const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const warehouseSchema = new Schema(
  {
    warehouseId: {
      type: String,
      unique: true,
    },
    storageCapacity: {
      type: Number,
      //required: true,
    },
    availability: {
      type: Boolean,
      //required: true,
    },
    location: {
      type: String,
      //required: true,
      maxLength: 255,
      minLength: 10,
      unique: true,
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
