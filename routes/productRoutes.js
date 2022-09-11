const express = require("express");
const {
  createProduct,
  getProductById,
  getProducts,
  getNewArrivalsProducts,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");
const { corsMiddleware } = require("../middlewares/corsMiddleware");
const router = express.Router();

router.route("/").get(corsMiddleware, getProducts);
router.route("/newArrival").get(corsMiddleware, getNewArrivalsProducts);
router.route("/:id").get(corsMiddleware, getProductById);
router.route("/admin/add").post(corsMiddleware, createProduct);

module.exports = router;
