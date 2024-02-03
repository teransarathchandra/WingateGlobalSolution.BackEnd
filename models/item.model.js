const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const itemSchema = new Schema(
  {
    itemId: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    weight: {
      type: Number,
      required: true
    },
    itemValue: {
      type: Number
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true
    },
  },
  { timestamps: true }
);

module.exports = model("item", itemSchema);
