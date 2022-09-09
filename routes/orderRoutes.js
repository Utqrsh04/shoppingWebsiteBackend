const express = require("express");
const {
  createOrder,
  getOrdersOfUser,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/create").post(protect, createOrder);
router.route("/").get(protect, getOrdersOfUser);

module.exports = router;
