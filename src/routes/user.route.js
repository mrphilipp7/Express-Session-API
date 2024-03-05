const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/user.controller");
const { validateLogin } = require("../validation/user.validation");

router.post("/register", registerUser);

router.post("/login", validateLogin, loginUser);

router.get("/currentUser", getCurrentUser);

router.post("/logout", logoutUser);

module.exports = router;
