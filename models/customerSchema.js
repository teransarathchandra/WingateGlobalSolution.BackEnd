const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const customerSchema = new Schema(
  {
    priorityLevel: {
      type: String,
      enum: ["High Priority", "Medium Priority", "Low Priority"],
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("customer", customerSchema);
