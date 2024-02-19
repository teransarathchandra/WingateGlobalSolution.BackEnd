const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const itemSchema = new Schema(
  {
    itemId: {
      type: String,
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

itemSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('employee');
    this.itemId = `ITM${nextId}`;
  }
  next();
});

module.exports = model("item", itemSchema);
