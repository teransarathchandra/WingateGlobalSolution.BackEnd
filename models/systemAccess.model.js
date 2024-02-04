const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const systemAccessSchema = new Schema(
  {
    accessLevelId: {
      type: Number,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 15,
    },
  },
  { timestamps: true }
);

module.exports = model("systemAccess", systemAccessSchema, "systemAccess");
