const express = require("express");
const router = express.Router();

// Load controllers
const paymentMethodController = require("../app/controllers/PaymentMethod");

// Category routes
router.post("/", paymentMethodController.addPaymentMethod);
router.get("/", paymentMethodController.getPaymentMethods);
router.patch("/:id", paymentMethodController.updatePaymentMethod);
router.delete("/:id", paymentMethodController.deletePaymentMethod);

module.exports = router;
