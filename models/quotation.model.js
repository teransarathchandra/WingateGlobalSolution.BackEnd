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
      type: Float,
      min: 0,
      required: true,
    },
    routeCost: {
      type: Float,
      min: 0,
      required: true,
    },
    unitWeightCost: {
      type: Float,
      min: 0,
      required: true,
    },
    surcharge: {
      type: Float,
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
