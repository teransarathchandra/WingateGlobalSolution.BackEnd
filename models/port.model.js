const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const portSchema = new Schema(
  {
    portId: {
      type: String,
      unique: true,
    },
    portCode: {
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
    },
    type: {
      type: String,
      required: true,
      maxLength: 20,
      minLength: 5,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
  },
  { timestamps: true }
);

portSchema.pre("save", async function (next) {
  if (this.isNew) {
    const nextId = await getNextSequence("port");
    this.portId = `PORT${nextId}`;
  }
  next();
});
module.exports = model("port", portSchema);
