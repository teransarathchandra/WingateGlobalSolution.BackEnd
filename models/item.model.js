const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const itemSchema = new Schema(
  {
    itemId: {
      type: String,
      unique: true,
    },
    itemName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100
    },
    description: {
      type: String,
      maxlength: 500
    },
    weight: {
      type: Number,
      required: true,
      min: 0.1,
      max: 10000
    },
    itemValue: {
      type: Number,
      required: true,
      min: 100,
      max: 100000000
    },
    packageCount: {
      type: Number,
      required: true,
      min: 1,
      max: 10000
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true
    },
    packageTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "packageType",
      required: true
    },
    isPickupOrder: {
      type: Boolean,
      required: true
    },
    pickupOrderDate: {
      type: Date,
      required: function() { return this.isPickupOrder; }
    }
  },
  { timestamps: true }
);

itemSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('item');
    this.itemId = `ITM${nextId}`;
  }
  next();
});

module.exports = model("item", itemSchema);
