const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { password, email } = require('../constants/regExp');
const { comparePassword, hashPassword } = require("../helpers");
const { nameSchema } = require('./name.model')
const { addressSchema } = require("./address.model");

const userSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: nameSchema
    },
    email: {
      type: String,
      required: true,
      match: email,
    },
    contactNumber: {
      type: Number,
      required: true,
      maxLength: 15,
      minLength: 10,
    },
    address: {
      type: addressSchema,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      match: password,
      required: true,
      minLength: 8,
      maxLength: 50,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = comparePassword;

userSchema.pre("save", hashPassword);

module.exports = model("user", userSchema);
