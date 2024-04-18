const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      maxLength: 255,
      minLength: 3,
      required: true,
      enum: ['InProgress', 'Processing', 'Completed', 'Pending']
    },
    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stock",
    },
    bulkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bulk",
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment",
    },
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commercialInvoice",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "item",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sender",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "receiver",
      required: true,
    },
    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quotation",
    },
    isPickupOrder: {
      type: Boolean,
      required: true,
    },
    pickupDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["Express", "Standard"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const nextId = await getNextSequence('order');
    this.orderId = `ORD${nextId}`;
  }
  next();
});

module.exports = model("order", orderSchema);
