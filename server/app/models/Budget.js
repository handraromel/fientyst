const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    // id: {
    //   type: mongoose.Types.ObjectId,
    //   required: true,
    // },
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

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
