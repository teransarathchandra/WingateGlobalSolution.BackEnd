const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const PaymentMethodSchema = new Schema(
    {
        paymentMethodId: {
            type:String,
            unique: true,
        },
        userName: {
            type: String,
            required: true,
            maxLength: 50,
          },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        method: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

PaymentMethodSchema.pre("save", async function(next) {
    if (this.isNew) {
      const nextId = await getNextSequence('paymentMethod');
      this.paymentMethodId = `PAYMETH${nextId}`;
    }
    next();
  });
module.exports = model("paymentMethod", PaymentMethodSchema);
