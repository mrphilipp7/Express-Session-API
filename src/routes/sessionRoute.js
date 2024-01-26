const express = require("express");
const router = express.Router();
const { checkStatus } = require("../controllers/sessionController");

router.get("/status", checkStatus);

module.exports = router;
