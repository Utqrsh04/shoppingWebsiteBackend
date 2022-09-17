const express = require("express");
const { paymentCaptured } = require("../controllers/paymentController");
const router = express.Router();

router.route("/payment-captured").post(paymentCaptured);

module.exports = router;
