const express = require("express");
const router = express.Router();

// Load controllers
const userController = require("../app/controllers/User");

// Auth routes
router.get("/", userController.getUsers)
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
