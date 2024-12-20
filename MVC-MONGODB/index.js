const express = require("express");
const fs = require("fs");

const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");
const { longReqRes } = require("./middleware");

const app = express();
const PORT = 8000;
// connection mongodb
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(() =>
  console.log("mongodb connected")
);

// middleware-plugin
app.use(express.urlencoded({ extended: false }));
// Route to return JSON data (REST API)
app.use(longReqRes("log.txt"));

// routes
app.use("/api/users", userRouter);

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
