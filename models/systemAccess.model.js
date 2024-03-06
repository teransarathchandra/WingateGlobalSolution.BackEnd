const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const systemAccessSchema = new Schema(
  {
    accessLevelId: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 255,
      minLength: 15,
    },
  },
  { timestamps: true }
);

systemAccessSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('systemAccess');
    this.accessLevelId = `ACSLVL${nextId}`;
  }
  next();
});
module.exports = model("systemAccess", systemAccessSchema, "systemAccess");
