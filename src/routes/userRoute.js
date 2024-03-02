const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  verifyUser,
} = require("../controllers/userController");
const { requireUser } = require("../middleware/requireUser");
const { validateLogin } = require("../services/validation/validateLogin");

const passport = require("passport");

router.post("/register", registerUser);

router.post("/login", validateLogin, passport.authenticate("local"), loginUser);

router.get("/currentUser", requireUser, getCurrentUser);

router.post("/logout", requireUser, logoutUser);

router.get("/verify/:id", verifyUser);

module.exports = router;
