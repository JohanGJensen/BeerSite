const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const db = require("../database/fakeDB");
// utilities
const util = require("../utilities/index");

router.get("/images/:image", (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "vendor/images",
    req.params.image
  );
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, img) => {
    if (err) {
      // other server error
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
    } else {
      // Success
      res.writeHead(200, {
        "Content-Type": util.getMimeType(ext),
        "Cache-Control": util.getCacheControl(ext),
      });
      res.end(img, "utf8");
    }
  });
});

module.exports = router;
