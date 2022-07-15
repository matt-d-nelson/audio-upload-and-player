const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const multer = require("multer");

const assetStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: assetStorage });

const posts = [];

router.post(
  "/",
  upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  (req, res) => {
    const newPost = {
      lat: req.body.lat,
      lng: req.body.lng,
      picture: req.files.picture[0].path,
      audio: req.files.audio[0].path,
    };
    posts.push(newPost);
    console.log("POST", newPost);
    res.sendStatus(200);
  }
);

router.get("/", (req, res) => {
  console.log("GET", posts);
  res.send(posts);
});

module.exports = router;
