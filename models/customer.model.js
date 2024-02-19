const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const customerSchema = new Schema(
  {
    customerId:{
      type: String,
      unique:true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    priorityLevel: {
      type: String,
      enum: ["High Priority", "Medium Priority", "Low Priority"],
      required: true,
    },
    birthday: {
      type: Date,
    },

  },
  { timestamps: true }
);

customerSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('customer');
    this.customerId = `CUS${nextId}`;
  }
  next();
});

module.exports = model("customer", customerSchema);
