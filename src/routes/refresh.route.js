const express = require("express");
const router = express.Router();
const refreshToken = require("../controllers/refresh.controller");

router.get("/", refreshToken);

module.exports = router;
