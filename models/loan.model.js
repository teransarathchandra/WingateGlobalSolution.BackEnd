const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const loansSchema = new Schema(
  {
    loanId: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    recurrence: {
      type: Number,
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

loansSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('loans');
    this.loanId = `LOAN${nextId}`;
  }
  next();
});

module.exports = model("loans", loansSchema);
