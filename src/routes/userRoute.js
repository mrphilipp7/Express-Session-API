const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/userController");
const { requireUser } = require("../middleware/requireUser");
const { validateLogin } = require("../services/validation/validateLogin");

const passport = require("passport");

router.post("/register", registerUser);

router.post("/login", validateLogin, passport.authenticate("local"), loginUser);

router.get("/currentUser", requireUser, getCurrentUser);

router.post("/logout", requireUser, logoutUser);

module.exports = router;
