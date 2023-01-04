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

// Use auth middleware for all routes in authRoutes
router.use("/auth", authRoutes, auth);
router.use("/categories", categoryRoutes, auth);
router.use("/savings", savingRoutes, auth);
router.use("/merchants", merchantRoutes, auth);
router.use("/users", userRoutes, auth);

module.exports = router;
