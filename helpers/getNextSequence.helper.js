const Counter = require('../models/counter.model');

async function getNextSequence(name) {
    const counter = await Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { new: true, upsert: true } // Upsert option will create the counter if it doesn't exist
    );
    return counter.seq;
}

module.exports = getNextSequence;