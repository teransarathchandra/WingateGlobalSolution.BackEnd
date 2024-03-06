const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const salesSchema = new Schema(
  {
    saleId: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 10,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 10,
      default: "In Progress",
    },
    salesDate: {
      type: Date,
      required: true,
    },
    salesPersonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
  },
  { timestamps: true }
);

salesSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('sales');
    this.saleId = `SALE${nextId}`;
  }
  next();
});
module.exports = model("sales", salesSchema);
