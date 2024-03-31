const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { getNextSequence } = require("../helpers");

const airlineSchema = new Schema({
    airlineId: {
        type: String,
        required: true
    },
    code: {
        type: String,
        maxLength: 4,
        minLength: 2
    },
    name: {
        type: String,
        maxLength: 50,
        minLength: 5
    },
    
}
);
airlineSchema.pre("save", async function(next) {
    if (this.isNew) {
      const nextId = await getNextSequence('airline');
      this.airlineId = `AIR${nextId}`;
    }
    next();
  });

module.exports = model("airline", airlineSchema);