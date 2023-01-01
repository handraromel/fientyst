const express = require("express");
const router = express.Router();

// Load controllers
const authController = require("../app/controllers/Auth");

// Auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authController.getAllUser);

module.exports = router;
