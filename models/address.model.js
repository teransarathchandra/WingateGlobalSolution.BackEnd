const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema(
    {
        street: {
            type: String,
            maxLength: 50,
            minLength: 5
        },
        city: {
            type: String,
            maxLength: 50,
            minLength: 5
        },
        state: {
            type: String,
            maxLength: 50,
            minLength: 5
        },
        country: {
            type: String,
            maxLength: 50,
            minLength: 2
        },
        countryId: {
            type: String,
            maxLength: 50,
            minLength: 2,
            ref: "country",
        }
    }, { _id: false }
);

module.exports = { addressSchema };