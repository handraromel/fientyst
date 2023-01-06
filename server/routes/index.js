const express = require("express");
const router = express.Router();

// Load middleware
const auth = require("../app/middleware/auth");

// Load routes
const authRoutes = require("./auth");
const categoryRoutes = require("./category");
const savingRoutes = require("./savings");
const merchantRoutes = require("./merchant");
const userRoutes = require("./user");
const paymentMethodRoutes = require("./paymentMethod");
const incomeRoutes = require("./income");
const budgetRoutes = require("./budget");
const expenseRoutes = require("./expense");

// Use auth middleware for all routes in authRoutes
router.use("/auth", authRoutes, auth);
router.use("/categories", categoryRoutes, auth);
router.use("/savings", savingRoutes, auth);
router.use("/merchants", merchantRoutes, auth);
router.use("/users", userRoutes, auth);
router.use("/payment-methods", paymentMethodRoutes, auth);
router.use("/incomes", incomeRoutes, auth);
router.use("/budgets", budgetRoutes, auth);
router.use("/expenses", expenseRoutes, auth);

module.exports = router;
