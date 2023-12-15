const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/userController");
const { handlePassportAuth } = require("../middleware/handlePassportAuth");
const { validateLogin } = require("../validation/validateLogin");

const passport = require("passport");

router.post("/register", registerUser);

router.post("/login", validateLogin, passport.authenticate("local"), loginUser);

router.get("/currentUser", handlePassportAuth, getCurrentUser);

router.post("/logout", logoutUser);

module.exports = router;
