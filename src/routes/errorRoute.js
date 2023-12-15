const express = require("express");
const router = express.Router();
const { getInvalidRoute } = require("../controllers/errorController");

router.get("", getInvalidRoute);

module.exports = router;
