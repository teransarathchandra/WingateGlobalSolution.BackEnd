const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const stocksSchema = new Schema(
  {
    stockId: {
      type:String,
      unique: true,
    },
    city: {
      type: String,
      required: true,
      maxLength: 50,
    },
    country: {
      type: String,
      required: true,
      maxLength: 50,
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "warehouse",
      required: true,
    },
    bulkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bulk",
      required: true,
    },
  },
  { timestamps: true }
);

stocksSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('stock');
    this.stockId = `STK${nextId}`;
  }
  next();
});
module.exports = model("stock", stocksSchema);
