const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");
const { regExp } = require('../constants');
const { nameSchema } = require('./name.model');
const { addressSchema } = require("./address.model");

const customerSchema = new Schema(
  {
    customerId: {
      type: String,
      unique: true,
    },
    name: {
      type: nameSchema
    },
    address: {
      type: addressSchema,
    },
    email: {
      type: String,
      required: true,
      match: regExp.email,
    },
    password: {
      type: String,
      maxLength: 100,
      minLength: 8,
    },
    contactNumber: {
      type: Number,
      required: true,
      maxLength: 15,
      minLength: 10,
    },
    verificationToken: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    priorityLevel: {
      type: String,
      enum: ["High Priority", "Medium Priority", "Low Priority"],
      required: true,
    },
    birthday: {
      type: Date,
    }
    ,

  },
  { timestamps: true }
);

customerSchema.pre("save", async function (next) {
  if (this.isNew) {
    const nextId = await getNextSequence('customer');
    this.customerId = `CUS${nextId}`;
  }
  next();
});

module.exports = model("customer", customerSchema);
