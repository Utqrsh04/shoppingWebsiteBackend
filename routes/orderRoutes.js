const express = require("express");
const {
  createOrder,
  getOrdersOfUser,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const { corsMiddleware } = require("../middlewares/corsMiddleware");
const router = express.Router();

router.route("/create").post(corsMiddleware, createOrder);
router.route("/").get(corsMiddleware, protect, getOrdersOfUser);

module.exports = router;
