const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { password, email } = require('../constants/regExp');
const { signToken, comparePassword, hashPassword } = require("../helpers");
const { nameSchema } = require('./name.model')
const { addressSchema } = require("./address.model");

const employeeSchema = new Schema(
  {
    employeeId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: nameSchema
    },
    address: {
      type: addressSchema
    },
    username: {
      type: String
    },
    email: {
      type: String,
      required: true,
      match: email,
    },
    password: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 8,
      match: password,
    },
    contactNumber: {
      type: Number,
      required: true,
      maxLength: 15,
      minLength: 10,
    },
    designationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "designation",
      required: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
    refreshToken: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

employeeSchema.methods.comparePassword = comparePassword;

employeeSchema.methods.signToken = signToken;

employeeSchema.pre("save", hashPassword);

module.exports = model("employee", employeeSchema);
