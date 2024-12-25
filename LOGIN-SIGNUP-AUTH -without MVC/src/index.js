const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const hbs = require("hbs");
const { connectMongoDb } = require("./mongodb");
const tempelatesPath = path.join(__dirname, "../tempelates");
app.use(express.json());
app.set("view engine", "hbs");

// mongodb connection
connectMongoDb("mongodb://127.0.0.1:27017/loginsignup").then(() =>
  console.log("connected")
);

app.set("views", tempelatesPath);
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };
  await collection.insertMany([data]);
  res.render("home");
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });
    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("wrong password");
    }
  } catch {
    res.send("wrong details");
  }
});
app.listen(3000, () => console.log("port connected"));
