const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { getNextSequence } = require("../helpers");

const reminderSchema = new Schema(
  {
    reminderId: {
      type: String,
    },
    reminderType: {
      type: String,
      maxLength: 255,
    },
    reminderDescription: {
      type: String,
      maxLength: 255,
    },
    reminderDate: {
      type: Date,
      required: true,
    },
    offer: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

reminderSchema.pre("save", async function(next) {
  if (this.isNew) {
    const nextId = await getNextSequence('reminder');
    this.reminderId = `REM${nextId}`;
  }
  next();
});

module.exports = model("reminder", reminderSchema);
