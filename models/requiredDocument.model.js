const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const requiredDocumentSchema = new Schema(
  {
    requiredDocumentId: {
      type: String,
      unique: true
    },
    documentType: {
      type: String,
      required: true,
      maxLength: 50
    },
    documentPath: {
      type: String
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "item",
      required: true
    },
  },
  { timestamps: true }
);

requiredDocumentSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('requiredDocuments');
    this.requiredDocumentId = `REQDOC${nextId}`;
  }
  next();
});
module.exports = model("requiredDocuments", requiredDocumentSchema, "requiredDocuments");
