const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  account_number: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;
