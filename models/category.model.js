const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const categorySchema = new Schema(
  {
    categoryId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      maxLength: 50,
      required: true,
    },
    description: {
      type: String,
      maxLength: 255,
    },
    costPerKilo: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('category');
    this.categoryId = `CATGRY${nextId}`;
  }
  next();
});

module.exports = model("category", categorySchema);
