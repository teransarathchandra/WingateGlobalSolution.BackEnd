
const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const paymentSchema = new Schema({

    //Need Foreign Keys. Remove this line after reviewing foreign keys.
    paymentId:{
        type : Number,
        required :  true,
        unique :  true
    },
    paymentDescription:{
        type : String,
        maxLength :  255
    },
    amount:{
        type : Float,
        required :  true,
        min : 0
    },
    paymentMethod:{
        type : String,
        required :  true
    },
    paymentStatus:{
        type : String,
        enum: ['Completed', 'Pending', 'Cancelled'],
        required :  true
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required :  true
   }
},{ timestamps: true }
);

module.exports = model('payment', paymentSchema);

