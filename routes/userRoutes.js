const express = require("express");
const {
  registerUser,
  authUser,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(authUser);

router.route("/profile").post(protect, updateUser);
module.exports = router;
