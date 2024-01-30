const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const itemSchema = new Schema(
  {
    itemId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    weight: {
      type: Float,
    },
    value: {
      type: Float,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);

module.exports = model("item", itemSchema);
