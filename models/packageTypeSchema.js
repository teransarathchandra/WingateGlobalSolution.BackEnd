
const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const packageTypeSchema = new Schema({

        packageId :{
                type :  String,
                required :  true,
                unique :  true
        },
        packageName:{
                type : String,
                maxLength : 100,
                minLength :  10,
                required :  true
        },
        packagingCost:{
                type : Float,
                required :  true,
                min :  0
        },
        width:{
                type : Float,
                min : 0
        },
        length:{
                type : Float,
                min : 0
        },
        height:{
                type : Float,
                min :  0
        },
        maximumWeight:{
                type : Number,
                min :  0 
        },
        maximumHeight:{
                type:Number, 
                min : 0
        },
        packageType:{
                type : String,
                required :  true
        }
},{ timestamps: true }
);

module.exports = model('packageType', packageTypeSchema);

