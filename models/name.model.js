const mongoose = require("mongoose");
const { Schema } = mongoose;

const { name } = require('../constants/regExp');

const nameSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxLength: 255,
            minLength: 5,
            match: name,
        },
        lastName: {
            type: String,
            required: true,
            maxLength: 255,
            minLength: 5,
            match: name,
        }
    }
);

module.exports = { nameSchema };
