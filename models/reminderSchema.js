
const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const reminderSchema = new Schema({
        //Need Foreign Keys. Remove this line after adding foreign keys.
        reminderId:{
                type : Number,
                required :  true,
                unique :  true
        },
        reminderDescription:{
                type : String,
                maxLength :  255
        },
        reminderDate:{
                type : Date,
                required :  true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required :  true
       }
},{ timestamps: true }
);

module.exports = model('reminder', reminderSchema);

