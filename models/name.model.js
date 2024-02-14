const mongoose = require("mongoose");
const { Schema } = mongoose;

const { regExp } = require('../constants');

const nameSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxLength: 255,
            minLength: 5,
            match: regExp.name,
        },
        lastName: {
            type: String,
            required: true,
            maxLength: 255,
            minLength: 5,
            match: regExp.name,
        }
    }
);

module.exports = { nameSchema };
