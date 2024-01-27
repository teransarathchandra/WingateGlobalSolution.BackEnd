const mongoose = require('mongoose');
const { Schema, model} = mongoose;
const { email, password, name } = require('../constants/regExp')

const adressSchema = new Schema({
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
});

const employeeSchema = new Schema(
    {
        employeeId: {
            type: Number,
            required: true,//Not Null
            maxLength: 20,
            minLength: 5,
            unique: true,//cannot enter duplicate values
        },
        name: {
            type: String,
            required: true,
            maxLength: 255,
            minLength: 10,
        },
        email: {
            type: String,
            required: true,
            match: email
        },
        contactNumber: {
            type: Number,
            maxLength: 15,
            minLength: 10,
        },
        password: {
            type: String,
            maxLength: 50,
            minLength: 8,
            match: password
        },
        accessLevelId: {//foriegn key
            type: mongoose.Schema.Types.ObjectId,
            ref: "accessLevel",//Linking table name
            required: true,
            //default: 'basic user'
        },
        address: {
            type: adressSchema,
            required: true
        },
        // createdDate: {
        //     type: Date,
        //     required: true,
        //     default: new Date.now()
        // }
    }, { timestamps: true}
);

module.exports = model('employee', employeeSchema);