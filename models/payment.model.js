const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const deliveryDetailsSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false });

const customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  deliveryDetails: deliveryDetailsSchema
}, { _id: false });

const amountDetailSchema = new Schema({
  currency: { type: String, required: true },
  gross: { type: Number, required: true },
  fee: { type: Number, required: true },
  net: { type: Number, required: true },
  exchangeRate: { type: Number, required: true },
  exchangeFrom: { type: String, required: true },
  exchangeTo: { type: String, required: true }
}, { _id: false });

const paymentMethodSchema = new Schema({
  method: { type: String, required: true },
  cardCustomerName: { type: String, required: true },
  cardNo: { type: String, required: true }
}, { _id: false });

const itemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  currency: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
}, { _id: false });

const paymentSchema = new Schema(
  {
    paymentId: { type: Number, unique: true, required: true },
    orderId: { type: String, required: true },
    paymentDate: { type: Date, required: true },
    description: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["RECEIVED", "PENDING", "CANCELLED", "FAILED"],
      required: true
    },
    currency: { type: String, required: true },
    amount: { type: Number, required: true },
    customer: { type: customerSchema, required: true },
    amountDetail: { type: amountDetailSchema, required: true },
    paymentMethod: { type: paymentMethodSchema, required: true },
    items: [{ type: itemSchema, required: true }],
    customFields: {
      custom1: { type: String, required: false },
      custom2: { type: String, required: false }
    }
  },
  { timestamps: true }
);

// const paymentSchema = new Schema(
//   {
//     paymentId: {
//       type: String,
//       unique: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     paymentMethod: {
//       type: String,
//       required: true,
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["Completed", "Pending", "Cancelled"],
//       required: true,
//     },
//     paymentDate: {
//       type: Date,
//       required: true,
//     },
//     orderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "order",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

paymentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const nextId = await getNextSequence("payment");
    this.paymentId = `PAYMNT${nextId}`;
  }
  next();
});

module.exports = model("payment", paymentSchema);
