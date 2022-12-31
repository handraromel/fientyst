const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
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

const Income = mongoose.model("Income", budgetSchema);

module.exports = Income;
