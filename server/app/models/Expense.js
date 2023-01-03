const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    bank_account: {
      type: mongoose.Types.ObjectId,
      ref: "BankAccount",
      required: true,
    },
    merchant: {
      type: mongoose.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },
    payment_method: {
      type: mongoose.Types.ObjectId,
      ref: "PaymentMethod",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
