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
      type: Float,
      required: true,
    },
    etf: {
      type: Float,
      required: true,
    },
    epf: {
      type: Float,
      required: true,
    },
    allowance: {
      type: Float,
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
