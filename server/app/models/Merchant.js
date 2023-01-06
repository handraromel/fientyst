const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema(
  {
    merchant_type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;
