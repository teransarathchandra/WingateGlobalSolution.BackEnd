const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");
//const { optional } = require("joi");

const submittedDocumentSchema = new Schema(
  {
    submittedDocumentId: {
      type: String,
      unique: true
    },
    documentName: {
      type: String,
      required: true
    },
    documentType: {
      type: String,
      required: true,
      maxLength: 50,
    },
    folderName: {
      type: String,
      required: true
    },
    documentPath: {
      type: String,
      required: true
    },
    referenceId: {
      type: String,
      required: true
    },
    remark: {
      type: String,
    },
  },
  { timestamps: true }
);

submittedDocumentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const nextId = await getNextSequence('submittedDocuments');
    this.submittedDocumentId = `SUBDOC${nextId}`;
  }
  next();
});
module.exports = model("submittedDocuments", submittedDocumentSchema, "submittedDocuments");
