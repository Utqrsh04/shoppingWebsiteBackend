const express = require("express");
const {
  fetchShippingAddress,
  saveShippingAddress,
} = require("../controllers/shippingController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(protect, fetchShippingAddress);
router.route("/update").post(protect, saveShippingAddress);

module.exports = router;
