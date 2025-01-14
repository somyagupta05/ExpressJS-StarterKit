const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor");

const app = express();
const PORT = 8000;

app.use(status());

app.get("/", (req, res) => {
  fs.readFile("./sample.txt", (err, data) => {
    res.end(data);
  });
});

app.get("/", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", "utf-8");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
});
app.listen(PORT, () => console.log("server started"));
