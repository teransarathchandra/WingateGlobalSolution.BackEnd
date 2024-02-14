//restricted order management
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require('../helpers')

const restrictedOrdersSchema = new Schema(
  {
    restrictedOrderId: {
      type: String,
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

restrictedOrdersSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('restrictedOrders');
    this.restrictedOrderId = `RESORD${nextId}`;
  }
  next();
});

module.exports = model("restricted_orders", restrictedOrdersSchema , "restrictedOrders" );

