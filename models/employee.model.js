const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { regExp } = require("../constants");
const {
    signToken,
    comparePassword,
    hashPassword,
    getNextSequence,
} = require("../helpers");
const { nameSchema } = require("./employee-name.model");
const { addressSchema } = require("./address.model");

const employeeSchema = new Schema(
    {
        employeeId: {
            type: String,
            unique: true,
        },
        name: {
            type: nameSchema,
        },
        // firstName: {
        //     type: String,
        //     required: true,
        //     maxLength: 255,
        //     minLength: 2,
        //     match: regExp.name,
        // },
        // lastName: {
        //     type: String,
        //     required: true,
        //     maxLength: 255,
        //     minLength: 2,
        //     match: regExp.name,
        // },
        address: {
            type: addressSchema,
        },
        // street: {
        //     type: String,
        //     maxLength: 50,
        //     minLength: 5
        // },
        // city: {
        //     type: String,
        //     maxLength: 50,
        //     minLength: 5
        // },
        // state: {
        //     type: String,
        //     maxLength: 50,
        //     minLength: 5
        // },
        // country: {
        //     type: String,
        //     maxLength: 50,
        //     minLength: 2
        // },
        // countryId: {
        //     type: String,
        //     maxLength: 50,
        //     minLength: 2,
        //     ref: "country",
        // },
        email: {
            type: String,
            required: true,
            match: regExp.email,
        },
        password: {
            type: String,
            required: true,
            maxLength: 100,
            minLength: 8,
            match: regExp.password,
        },
        contactNumber: {
            type: Number,
            required: true,
            maxLength: 15,
            minLength: 10,
        },
        focus: {
            type: String,
            required: false,
            maxLength: 15,
            minLength: 0,
        },
        designationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "designation",
            required: true,
        },
        accessLevel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "systemAccess",
            default: "66247ee2e3a24c3c7e0fe787",
        },
        refreshToken: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

employeeSchema.methods.comparePassword = comparePassword;

employeeSchema.methods.signToken = signToken;

employeeSchema.pre("save", async function (next) {
    if (this.isNew) {
        const nextId = await getNextSequence("employee");
        this.employeeId = `EMP${nextId}`;
    }
    next();
});

employeeSchema.pre("save", hashPassword);

module.exports = model("employee", employeeSchema);
