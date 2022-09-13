const express = require("express");
const {
  createOrder,
  getOrdersOfUser,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const { corsMiddleware } = require("../middlewares/corsMiddleware");
const router = express.Router();

router.route("/create").post(createOrder);
router.route("/").get(protect, getOrdersOfUser);

module.exports = router;
