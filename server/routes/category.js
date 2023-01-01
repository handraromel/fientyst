const express = require("express");
const router = express.Router();

// Load controllers
const categoryController = require("../app/controllers/Category");

// Category routes
router.post("/", categoryController.addCategory);
router.get("/", categoryController.getCategories);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
