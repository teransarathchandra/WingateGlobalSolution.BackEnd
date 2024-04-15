const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const itemSchema = new Schema(
  {
    itemId: {
      type: String,
      unique: true
    },
    itemName: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    weight: {
      type: Number,
      required: true
    },
    itemValue: {
      type: Number,
      required: true
    },
    packageCount: {
      type: Number,
      required: true
    },
    // orderId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "order",
    //   required: true
    // },
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
