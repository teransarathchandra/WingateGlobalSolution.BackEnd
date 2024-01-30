//route management
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const countrySchema = new Schema(
  {
    countryId: {
      type: Number,
      required: true,
      unique: true,
    },
    countryCode: {
      required: true,
      maxLength: 5,
      minLength: 2,
      unique: true,
    },
    mobileCode: {
      type: String,
      required: true,
      maxLength: 10,
      minLength: 3,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 10,
      unique: true,
    },
    currency: {
      type: String,
      required: true,
      maxLength: 5,
      minLength: 1,
      unique: true,
    },
    exchangeRate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("country", countrySchema);
