
const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const portSchema = new Schema({

        //Need Foreign Keys. Remove this line after reviewing foreign keys.
        portId:{
                type : Number,
                required :  true,
                unique :  true
        },
        portCode:{
                type : String,
                required :  true,
                maxLength :  5,
                minLength :  2,
                unique :  true
},
        name:{
                type : String,
                required :  true,
                maxLength :  255,
                minLength :  10
},
        type:{
                type : String,
                required :  true,
                maxLength :  20,
                minLength :  5
},
        countryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "country",
            required :  true
}
    },{ timestamps: true }
);

module.exports = model('port', portSchema);

