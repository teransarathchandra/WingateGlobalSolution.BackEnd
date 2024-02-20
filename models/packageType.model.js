const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const packageTypeSchema = new Schema(
  {
    packageId: {
      type: String,
      unique: true,
    },
    packageName: {
      type: String,
      maxLength: 100,
      required: true,
    },
    packagingCost: {
      type: Number,
      required: true,
      min: 0,
    },
    width: {
      type: Number,
      min: 0,
    },
    length: {
      type: Number,
      min: 0,
    },
    height: {
      type: Number,
      min: 0,
    },
    maximumWeight: {
      type: Number,
      min: 0,
    },
    maximumHeight: {
      type: Number,
      min: 0,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

packageTypeSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('packageType');
    this.packageId = `PCKTYP${nextId}`;
  }
  next();
});

module.exports = model("packageType", packageTypeSchema);
