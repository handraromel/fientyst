const express = require("express");
const router = express.Router();

// Load controllers
const expenseController = require("../app/controllers/Expense");

// Category routes
router.post("/", expenseController.addExpense);
router.get("/", expenseController.getExpenses);
router.patch("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
