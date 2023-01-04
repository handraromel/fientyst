const express = require("express");
const router = express.Router();

// Load controllers
const authController = require("../app/controllers/Auth");

// Auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
