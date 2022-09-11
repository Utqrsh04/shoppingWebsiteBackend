const express = require("express");
const {
  registerUser,
  authUser,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { corsMiddleware } = require("../middlewares/corsMiddleware");
const router = express.Router();

router.route("/signup").post(corsMiddleware, registerUser);
router.route("/login").post(corsMiddleware, authUser);

router.route("/profile").post(protect, updateUser);
module.exports = router;
