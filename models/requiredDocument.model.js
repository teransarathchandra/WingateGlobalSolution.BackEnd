const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const requiredDocumentSchema = new Schema(
  {
    requiredDocumentId: {
      type: Number,
      required: true,
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

module.exports = model("required_documents", requiredDocumentSchema, "requiredDocuments");
