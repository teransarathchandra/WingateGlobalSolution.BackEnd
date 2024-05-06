const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { regExp } = require('../constants');
const { signToken, comparePassword, hashPassword, getNextSequence } = require("../helpers");
const { nameSchema } = require('./name.model')
const { addressSchema } = require("./address.model");

const userSchema = new Schema(
  {
    userId: {
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
      required: true,
      maxLength: 100,
      minLength: 8,
      match: regExp.password,
    },
    contactNumber: {
      type: Number,
      required: true,
      maxLength: 15,
      minLength: 10,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = comparePassword;

userSchema.methods.signToken = signToken;

userSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('user');
    this.userId = `USR${nextId}`;
  }
  next();
});

userSchema.pre("save", hashPassword);

module.exports = model("user", userSchema);
