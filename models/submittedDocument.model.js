const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const submittedDocumentSchema = new Schema(
  {
    submittedDocumentId: {
      type: String,
      unique: true
    },
    documentType: {
      type: String,
      required: true,
      maxLength: 50,
      enum: ["Export License", "Import Permit", "Safety Data Sheets", "Phytosanitary Certificate", "Dangerous Goods Declaration"],
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

submittedDocumentSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('submittedDocuments');
    this.submittedDocumentId = `SUBDOC${nextId}`;
  }
  next();
});
module.exports = model("submittedDocuments", submittedDocumentSchema, "submittedDocuments");
