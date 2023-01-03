const express = require("express");
const router = express.Router();

// Load controllers
const merchantController = require("../app/controllers/Merchant");

// Category routes
router.post("/", merchantController.addMerchant);
router.get("/", merchantController.getMerchants);
router.patch("/:id", merchantController.updateMerchant);
router.delete("/:id", merchantController.deleteMerchant);

module.exports = router;
