const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const paymentSchema = new Schema(
  {
    paymentId: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Completed", "Pending", "Cancelled"],
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
  },
  { timestamps: true }
);

paymentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const nextId = await getNextSequence("payment");
    this.paymentId = `PAYMNT${nextId}`;
  }
  next();
});

module.exports = model("payment", paymentSchema);
