const express = require("express");
const router = express.Router();

// Load controllers
const budgetController = require("../app/controllers/Budget");

// Category routes
router.post("/", budgetController.addBudget);
router.get("/", budgetController.getBudgets);
router.patch("/:id", budgetController.updateBudget);
router.delete("/:id", budgetController.deleteBudget);

module.exports = router;
