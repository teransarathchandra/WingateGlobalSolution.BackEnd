//route management
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const countrySchema = new Schema(
  {
    countryId: {
      type: String,
      unique: true,
    },
    countryCode: {
      type: String,
      required: true,
      maxLength: 5,
      minLength: 2,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 10,
      unique: true,
    },
    mobileCode: {
      type: String,
      required: true,
      maxLength: 10,
      minLength: 3,
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

countrySchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('country');
    this.countryId = `CNTRY${nextId}`;
  }
  next();
});
module.exports = model("country", countrySchema);
