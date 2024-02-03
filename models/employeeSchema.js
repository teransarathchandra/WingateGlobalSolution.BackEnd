const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { password, name } = require('../constants/regExp');

const employeeSchema = new Schema(
  {
    employeeId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 10,
      match: name,
    },
    address: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 10,
    },
    password: {
      type: String,
      required: true,
      maxLength: 50,
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
  },
  { timestamps: true }
);

module.exports = model("employee", employeeSchema);
