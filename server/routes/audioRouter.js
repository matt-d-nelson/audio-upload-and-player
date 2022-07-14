const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const multer = require("multer");

const posts = [];

router.post("/", (req, res) => {
  res.send("ribbit");
});

router.get("/", (req, res) => {
  res.send("quack");
});

module.exports = router;
