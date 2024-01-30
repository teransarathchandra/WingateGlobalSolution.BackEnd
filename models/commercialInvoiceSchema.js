
const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const commercialInvoiceSchema = new Schema({

    //Need Foreign Keys. Remove this line after reviewing foreign keys.
    invoiceId:{
            type : Number,
            required :  true,
            unique :  true
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required :  true
   }
},{ timestamps: true }
);

module.exports = model('commercialInvoice', commercialInvoiceSchema);

