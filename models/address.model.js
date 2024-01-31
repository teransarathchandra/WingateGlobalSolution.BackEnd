const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    street: {
        type: String,
        maxLength: 50,
        minLength: 8
    },
    city: {
        type: String,
        maxLength: 50,
        minLength: 8
    },
    state: {
        type: String,
        maxLength: 50,
        minLength: 8
    }
}
);

module.exports = addressSchema;