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
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    bank_account_id: {
      type: mongoose.Types.ObjectId,
      ref: "BankAccount",
      required: true,
    },
    merchant_id: {
      type: mongoose.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },
    payment_method_id: {
      type: mongoose.Types.ObjectId,
      ref: "PaymentMethod",
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
