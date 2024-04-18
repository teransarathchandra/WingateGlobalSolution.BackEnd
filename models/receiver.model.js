const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { regExp } = require('../constants');
const { nameSchema } = require('./name.model');
const { addressSchema } = require("./address.model");
const { getNextSequence } = require("../helpers");

const receiverSchema = new Schema(
  {
    receiverId: {
      type: String,
      unique: true,
    },
    name: nameSchema,
    contactNumber: {
      type: Number,
      maxLength: 15,
      minLength: 10,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: regExp.email,
    },
    address: addressSchema,
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      unique: true,
    },
  },
  { timestamps: true }
);

receiverSchema.pre("save", async function (next) {
  if (this.isNew) {
    const nextId = await getNextSequence('receiver');
    this.receiverId = `RECV${nextId}`;
  }
  next();
});

module.exports = model("receiver", receiverSchema);
