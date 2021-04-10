const fs = require("fs");
const path = require("path");
// express library - routing
const express = require("express");
const app = express();
// routes
const beersRoute = require("./routes/beers");
const pagesRoute = require("./routes/pages");
const filesRoute = require("./routes/files");
// utilities
const util = require("./utilities/index");

const hostname = process.env.YOUR_HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: false,
  })
);

const getFile = (filePath, response, extension) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // page not found
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, html) => {
          response.writeHead(404, { "Content-Type": "text/html" });
          response.end(html, "utf8");
        });
      } else {
        // other server error
        response.writeHead(500);
        response.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      response.writeHead(200, {
        "Content-Type": util.getMimeType(extension),
        "Cache-Control": util.getCacheControl(extension),
      });
      response.end(data, "utf8");
    }
  });
};

app.use("/beer", beersRoute);
app.use("/pages", pagesRoute);
app.use("/files", filesRoute);

// app.use(express.static("public"));
app.use("/", (req, res) => {
  const filePath = path.join(__dirname, "public", util.getPageHtml(req.url));

  const ext = path.extname(filePath);

  getFile(filePath, res, ext);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
