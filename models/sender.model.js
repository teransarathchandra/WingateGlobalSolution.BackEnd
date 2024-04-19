const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { regExp } = require('../constants');
const { nameSchema } = require('./name.model');
const { addressSchema } = require("./address.model");
const { getNextSequence } = require("../helpers");

const senderSchema = new Schema(
    {
        senderId: {
            type: String,
            unique: true,
        },
        name: nameSchema,
        contactNumber: {
            type: Number,
            maxLength: 15,
            minLength: 10,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: regExp.email,
        },
        address: addressSchema,
    },
    { timestamps: true }
);

senderSchema.pre("save", async function (next) {
    if (this.isNew) {
        const nextId = await getNextSequence('sender');
        this.senderId = `SENDER${nextId}`;
    }
    next();
});

module.exports = model("sender", senderSchema);
