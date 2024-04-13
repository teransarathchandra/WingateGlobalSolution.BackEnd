const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      maxLength: 255,
      minLength: 3,
      required: true,
    }, //Default: InProgress, Processing, Completed. Pending(Until Released from Restricted Order Criteria)
    packageCount: {
      type: Number,
      min:1,
      default: 1,
      required: true,
    }, //Boxes Count
    // orderType: {
    //   type: String,
    //   required: true,
    // }, //Express, Standard Shipping
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // routeId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "route",
    //   required: true,
    // },
    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stock",
    },
    bulkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bulk",
      //required: true,?????
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "packageType",
      required: true,
    },
    // categoryId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "category",
    //   required: true,
    // },
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
    }, //boolean
    pickupDate: {
      type: Date,
    }, //If it is a pick up order, this field is required
    priority: {
      type: String,
      enum: ["Express", "Standard", "Delivered"],
      required: true,
    } //Express, Standard Shipping
  },
  { timestamps: true }
);

orderSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('order');
    this.orderId = `ORD${nextId}`;
  }
  next();
});

module.exports = model("order", orderSchema);
