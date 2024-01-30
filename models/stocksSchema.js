
const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const stocksSchema = new Schema({

    //Need Foreign Keys. Remove this line after reviewing foreign keys.
    stockId:{
                type : Number,
                required :  true,
                unique :  true
    },
    city:{
                type : String,
                required :  true,
                maxLength : 50
},
    country:{
                type : String,
                required :  true,
                maxLength : 50
},
    warehouseId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "warehouse",
                required :  true
   },
   bulkId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "bulk",
                required :  true
   }
},{ timestamps: true }
);

module.exports = model('stocks', stocksSchema);

