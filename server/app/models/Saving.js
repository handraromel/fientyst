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
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
  }
);

const Saving = mongoose.model("Saving", savingSchema);

module.exports = Saving;
