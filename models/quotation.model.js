const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");
const { number } = require("joi");

const quotationSchema = new Schema(
  {
    quotationId: {
      type: String,
      unique: true,
    },
    packagingCost: {
      type: Number,
      min: 0,
      //required: true,
    },
    routeCost: {
      type: Number,
      min: 0,
     // required: true,
    },
    unitWeightCost: {
      type: Number,
      min: 0,
      //required: true,
    },
    pickUpCost: {
      type: Number,
      min: 0,
      //required: true,
    },
    surcharge: {
      type: Number,
      //required: true,
      min: 0,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      //required: true,
    },
    fullAmount: {
      type: Number
    }
  },
  { timestamps: true }
);

quotationSchema.pre("save", async function (next) {
  if (this.isNew) {
    const nextId = await getNextSequence("quotation");
    this.quotationId = `QUOT${nextId}`;
  }
  next();
});

module.exports = model("quotation", quotationSchema);
