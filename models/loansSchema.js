const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const loansSchema = new Schema(
  {
    loanId: {
      type: Number,
      required: true,
      unique: true,
    },
    amount: {
      type: Float,
      required: true,
    },
    interestRate: {
      type: Float,
      required: true,
    },
    recurrence: {
      type: Float,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("loans", loansSchema);
