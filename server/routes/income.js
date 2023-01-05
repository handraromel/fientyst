const express = require("express");
const router = express.Router();

// Load controllers
const incomeController = require("../app/controllers/Income");

// Category routes
router.post("/", incomeController.addIncome);
router.get("/", incomeController.getIncomes);
router.patch("/:id", incomeController.updateIncome);
router.delete("/:id", incomeController.deleteIncome);

module.exports = router;
