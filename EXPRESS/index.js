const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send("hello from home page");
});

app.get("/about", (req, res) => {
  return res.send("hello from about page " + "hey" + req.query.name);
});

const myServer = http.createServer(app);
myServer.listen(8000, () => console.log("server started"));
