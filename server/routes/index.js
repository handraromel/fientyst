const express = require("express");
const router = express.Router();

// Load middleware
const auth = require("../app/middleware/auth");

// Load routes
const authRoutes = require("./auth");
const categoryRoutes = require("./category");
const savingRoutes = require("./savings");
const merchantRoutes = require("./merchant");

// Use auth middleware for all routes in authRoutes
router.use("/auth", authRoutes, auth);
router.use("/categories", categoryRoutes);
router.use("/savings", savingRoutes);
router.use("/merchants", merchantRoutes);

module.exports = router;
