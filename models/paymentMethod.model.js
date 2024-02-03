const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PaymentMehtodSchema = new Schema(
    {
        paymentMethodId: {
            type: Number,
            required: true,
            unique: true,
        },
        UserName: {
            type: String,
            required: true,
            maxLength: 50,
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
    },
    { timestamps: true }
);

module.exports = model("paymentMethod", PaymentMehtodSchema);
