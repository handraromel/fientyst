const express = require("express");
const router = express.Router();

// Load controllers
const savingController = require("../app/controllers/Savings");

// Category routes
router.post("/", savingController.addSaving);
router.get("/", savingController.getSavings);
router.patch("/:id", savingController.updateSaving);
router.delete("/:id", savingController.deleteSaving);

module.exports = router;
