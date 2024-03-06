const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { regExp } = require('../constants');

const { getNextSequence } = require("../helpers");

const contactPersonSchema = new Schema(
  { 
    contactPersonId: {
      type: String,
      unique: true,
  },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
      maxLength: 50,
    },
    contactNumber: {
      type: Number,
      required: true,
      maxLength: 15,
      minLength: 10,
    },
    email: {
      type: String,
      required: true,
      match: regExp.email,
    },
  },
  { timestamps: true }
);

contactPersonSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('contactPerson');
    this.contactPersonId = `CONTCT${nextId}`;
  }
  next();
});

module.exports = model("contactPerson", contactPersonSchema, "contactPerson");
