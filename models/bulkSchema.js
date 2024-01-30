
const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const bulkSchema = new Schema({

    //Need Foreign Keys. Remove this line after reviewing foreign keys.
    bulkId:{
                type : Number,
                required :  true,
                unique :  true
    },
    currentLocation:{
                type : String

    },
    arrivedTime:{
                type : String
    },
    status:{
                type : String,
                enum: ['In Progress', 'Arrived', 'Delivered'],
        
    },
    vehicleAssignedDate:{
                type : Date,
                required :  true
},
    vehicleId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "vehicle",
                required :  true
   }
},{ timestamps: true }
);

module.exports = model('bulk', bulkSchema);

