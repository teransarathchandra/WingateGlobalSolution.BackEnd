const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    categoryId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      maxLength: 50,
      required: true,
    },
    description: {
      type: String,
      maxLength: 255,
    },
    profitRate: {
      type: Float,
      required: true,
      min: 0,
    },
    costPerKilo: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("category", categorySchema);
