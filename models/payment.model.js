const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    paymentId: {
      type: Number,
      required: true,
      unique: true,
    },
    paymentDescription: {
      type: String,
      maxLength: 255,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Completed", "Pending", "Cancelled"],
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("payment", paymentSchema);
