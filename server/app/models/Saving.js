const mongoose = require("mongoose");

const savingSchema = new mongoose.Schema(
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

const Saving = mongoose.model("Saving", budgetSchema);

module.exports = Saving;
