const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const designationSchema = new Schema(
  {
    designationId: {
      type:String,
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
designationSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('designation');
    this.designationId = `DES${nextId}`;
  }
  next();
});

module.exports = model("designation", designationSchema);
