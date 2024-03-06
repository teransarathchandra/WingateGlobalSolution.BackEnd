const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 10,
    },
    packageCount: {
      type: Number,
      min:1,
      default: 1,
    },

    orderType: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "route",
      required: true,
    },
    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stock",
      //required: true,?????
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "packageType",
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('order');
    this.orderId = `ORD${nextId}`;
  }
  next();
});

module.exports = model("order", orderSchema);
