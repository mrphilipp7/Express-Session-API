const express = require("express");
const router = express.Router();
const { getInvalidRoute } = require("../controllers/error.controller");

router.get("", getInvalidRoute);

module.exports = router;
