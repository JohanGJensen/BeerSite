const express = require("express");
const router = express.Router();
const db = require("../database/fakeDB");

router.get("/viewer", (req, res) => {
  res.json({ msg: "Pages works" });
});

module.exports = router;
