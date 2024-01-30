
const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const requiredDocumentsSchema = new Schema({

        //Need Foreign Keys. Remove this line after reviewing foreign keys.
        requiredDocumentId:{
                type : Number,
                required :  true,
                unique :  true
        },
        documentType:{
                type : String,
                required :  true,
                maxLength :  50
        },
        documentPath:{
                type : String
},
        itemId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "item"
        }
    },{ timestamps: true }
);

module.exports = model('requiredDocuments', requiredDocumentsSchema);

