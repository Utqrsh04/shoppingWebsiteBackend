const express = require("express");
const {
  createOrder,
  getOrdersOfUser,
  getOrderById,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/create").post(protect, createOrder);
router.route("/").get(protect, getOrdersOfUser);
router.route("/:id").get(protect, getOrderById);

module.exports = router;
