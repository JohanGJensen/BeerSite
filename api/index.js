const express = require("express");
const app = express();
// routes
const beersRoute = require("./routes/beers");
const pagesRoute = require("./routes/pages");
const filesRoute = require("./routes/files");
// cors
const cors = require("cors");

const hostname = process.env.HOST_URL || "0.0.0.0";
const port = process.env.PORT || 7000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/beer", beersRoute);
app.use("/pages", pagesRoute);
app.use("/files", filesRoute);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
