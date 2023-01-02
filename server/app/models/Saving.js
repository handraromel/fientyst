const mongoose = require("mongoose");

const savingSchema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const Saving = mongoose.model("Saving", budgetSchema);

module.exports = Saving;
