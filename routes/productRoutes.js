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

router.route("/").get(getProducts);
router.route("/newArrival").get(getNewArrivalsProducts);
router.route("/:id").get(getProductById);
router.route("/admin/add").post(createProduct);

module.exports = router;
