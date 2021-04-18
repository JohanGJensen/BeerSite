const express = require("express");
const router = express.Router();
const db = require("../database/fakeDB");

router.get("/all", (req, res) => {
  res.send(db.collection);
});

router.get("/selected", (req, res) => {
  res.send(db.selected);
});

router.post("/selected/:id", (req, res) => {
  const id = req.params.id;
  const item = db.collection.find((item) => id === item.id);

  if (item) {
    db.selected = item;
    res.send(item);
  } else {
    db.selected = null;
    res.json({ msg: "failed to set selected item" });
  }
});

module.exports = router;
