const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const designationSchema = new Schema(
  {
    designationId: {
      type: Number,
      required: true,
      unique: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    etf: {
      type: Number,
      required: true,
    },
    epf: {
      type: Number,
      required: true,
    },
    allowance: {
      type: Number,
      required: true,
    },
    accessLevelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "systemAccess",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("designation", designationSchema);
