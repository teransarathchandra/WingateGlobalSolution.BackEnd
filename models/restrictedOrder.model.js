//restricted order management
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const restrictedOrdersSchema = new Schema(
  {
    restrictedOrderId: {
      type: Number,
      required: true,
      unique: true,
    },
    maxQuantity: {
      type: Number,
      required: true,
    },
    exportLicense: {
      type: Boolean,
      required: true,
    },
    importPermit: {
      type: Boolean,
      required: true,
    },
    safetyDataSheets: {
      type: Boolean,
      required: true,
    },
    phytosanitaryCertificate: {
      type: Boolean,
      required: true,
    },
    dangerousGoodsDeclaration: {
      type: Boolean,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    sendingCountryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
    receivingCountryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("restricted Orders", restrictedOrdersSchema );

