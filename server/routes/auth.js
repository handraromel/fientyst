const express = require("express");
const router = express.Router();

// Load controllers
const authController = require("../app/controllers/Auth");

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", authController.register);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", authController.login);

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", authController.getAllUser);

module.exports = router;
