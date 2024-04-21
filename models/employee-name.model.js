const mongoose = require("mongoose");
const { Schema } = mongoose;

const { regExp } = require('../constants');

const nameSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxLength: 255,
            minLength: 2,
            match: regExp.name,
            default: 'Unknown'
        },
        lastName: {
            type: String,
            required: true,
            maxLength: 255,
            minLength: 2,
            match: regExp.name,
            default: 'Unknown'
        }
    }, { _id: false }
);

module.exports = { nameSchema };
