
const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const salesSchema = new Schema({

        //Need Foreign Keys. Remove this line after reviewing foreign keys.
        saleId:{
                type : Number,
                required :  true,
                unique :  true
        },
        description:{
                type : String,
                required :  true,
                maxLength :  255,
                minLength :  10
},
        amount:{
                type : Float,
                required :  true
},
        status:{
                type : String,
                required :  true,
                maxLength :  255,
                minLength :  10,
                default: 'In Progress'
        },
        salesDate:{
                type : Date,
                required :  true
},
        salesPersonId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "employee",
            required :  true
},
        customerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "customer",
            required :  true
}
    
    },{ timestamps: true }
);

module.exports = model('sales', salesSchema);
