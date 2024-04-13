const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const fileUploadSchema = new Schema(
    {
        uploadId: {
            type: String,
            unique: true
        },
        type: {
            type: String,
            required: true,
        },
        folderName: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

fileUploadSchema.pre("save", async function (next) {
    if (this.isNew) {
        const nextId = await getNextSequence('fileUpload');
        this.uploadId = `UPLOAD${nextId}`;
    }
    next();
});

module.exports = model('Upload', fileUploadSchema);