const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { email, password, name } = require('../constants/regExp');

//const addressSchema = require("./addressSchema");

const userSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      match: name
    },
    lastName: {
      type: String,
      maxLength: 50,
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
      type: String,
      required: true,
      maxLength: 255,
      minLength: 10,
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

module.exports = model("user", userSchema);
