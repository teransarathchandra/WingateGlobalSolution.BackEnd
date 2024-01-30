
const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const contactPersonSchema = new Schema({

    //Need Foreign Keys. Remove this line after reviewing foreign keys.
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required :  true
   },
    contactPerson:{
            type : String,
            required :  true,
            maxLength :  50
},
    contactNumber:{
        type : Number,
        required :  true,
        maxLength :  15,
        minLength :  10

    },
    email:{
        type : String,
        required : true,
        match :  email
    }
},{ timestamps: true }
);

module.exports = model('contactPerson', contactPersonSchema);

