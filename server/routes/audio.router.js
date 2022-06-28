const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const multer = require("multer");

router.get("/", (req, res) => {
  res.send("quack");
});

module.exports = router;
