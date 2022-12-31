const express = require("express");
const router = express.Router();

// Load middleware
const auth = require("../app/middleware/auth");

// Load routes
const authRoutes = require("./auth");

// Use auth middleware for all routes in authRoutes
router.use("/auth", authRoutes, auth);

module.exports = router;
