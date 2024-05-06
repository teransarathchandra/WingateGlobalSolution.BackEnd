//route management
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const countrySchema = new Schema(
  {
    countryId: {
      type: String,
      unique: true,
    },
    countryCode: {
      type: String,
      //required: true,
      maxLength: 5,
      minLength: 2,
      unique: true,
    },
    name: {
      type: String,
      maxLength: 255,
      minLength: 1,
      unique: true,
    },
  
    currency: {
      type: String,
     // required: true,
      maxLength: 5,
      minLength: 1,
  
    },
    cost : {
      type: Number,
      //required: true,
      
    }
    
  },
  { timestamps: true }
);

countrySchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('country');
    this.countryId = `CNTRY${nextId}`;
  }
  next();
});
module.exports = model("country", countrySchema);
