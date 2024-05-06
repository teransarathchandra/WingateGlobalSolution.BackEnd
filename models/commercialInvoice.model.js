const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const commercialInvoiceSchema = new Schema(
  {
    invoiceId: {
      type: String,
      unique: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    documentPath:{
      type: String
    }
  },
  { timestamps: true }
);

commercialInvoiceSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('commercialInvoice');
    this.invoiceId = `COMINV${nextId}`;
  }
  next();
});


module.exports = model("commercialInvoice", commercialInvoiceSchema);
