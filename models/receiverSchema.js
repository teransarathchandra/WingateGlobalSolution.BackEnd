const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const addressSchema = require("./addressSchema");

const receiverSchema = new Schema(
  {
    receiverId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 10,
    },
    contactNumber: {
      type: Number,
      maxLength: 15,
      minLength: 10,
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
      unique: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("receiver", receiverSchema);
