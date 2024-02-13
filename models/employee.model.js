const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { password, email } = require('../constants');
const { signToken, comparePassword, hashPassword, getNextSequence } = require("../helpers");
const { nameSchema } = require('./name.model')
const { addressSchema } = require("./address.model");

const employeeSchema = new Schema(
  {
    employeeId: {
      type: String,
      unique: true,
    },
    name: {
      type: nameSchema
    },
    address: {
      type: addressSchema
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
    refreshToken: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

employeeSchema.methods.comparePassword = comparePassword;

employeeSchema.methods.signToken = signToken;

employeeSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('employee');
    this.employeeId = `EMP${nextId}`;
  }
  next();
});

employeeSchema.pre("save", hashPassword);

module.exports = model("employee", employeeSchema);
