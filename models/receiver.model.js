const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { nameSchema } = require('./name.model')
const { regExp } = require('../constants');
const addressSchema = require("./address.model");
const { getNextSequence } = require("../helpers");

const receiverSchema = new Schema(
  {
    receiverId: {
      type: String,
      unique: true,
    },
    name: {
      type: nameSchema
    },
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

receiverSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('receiver');
    this.receiverId = `RECV${nextId}`;
  }
  next();
});

module.exports = model("receiver", receiverSchema);
