const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/budget", require("./budget"));
router.use("/expense", require("./expense"));
router.use("/income", require("./income"));
router.use("/merchant", require("./merchant"));
router.use("/payment-method", require("./paymentMethod"));
router.use("/savings", require("./savings"));
router.use("/user", require("./user"));

module.exports = router;
