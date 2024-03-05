const express = require("express");
const router = express.Router();
const { checkStatus } = require("../controllers/session.controller");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/status", verifyJWT, checkStatus);

module.exports = router;
