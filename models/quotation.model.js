const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quotationSchema = new Schema(
  {
    quotationId: {
      type: Number,
      required: true,
      unique: true,
    },
    packagingCost: {
      type: Number,
      min: 0,
      required: true,
    },
    routeCost: {
      type: Number,
      min: 0,
      required: true,
    },
    unitWeightCost: {
      type: Number,
      min: 0,
      required: true,
    },
    surcharge: {
      type: Number,
      required: true,
      min: 0,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("quotation", quotationSchema);
