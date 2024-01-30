const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    orderId: {
      type: Number,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 10,
      required: true,
    },
    packageCount: {
      type: Number,
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

module.exports = model("order", orderSchema);
