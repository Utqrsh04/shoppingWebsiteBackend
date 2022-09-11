const express = require("express");
const {
  fetchShippingAddress,
  saveShippingAddress,
} = require("../controllers/shippingController");
const { protect } = require("../middlewares/authMiddleware");
const { corsMiddleware } = require("../middlewares/corsMiddleware");
const router = express.Router();

router.route("/").get(corsMiddleware, protect, fetchShippingAddress);
router.route("/update").post(corsMiddleware, protect, saveShippingAddress);

module.exports = router;
