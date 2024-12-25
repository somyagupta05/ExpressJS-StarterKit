const express = require("express");
const path = require("path");
const { connectMongoDb } = require("./mongodb");
const authRoutes = require("../routes/user");
const app = express();

// MongoDB Connection
connectMongoDb("mongodb://127.0.0.1:27017/loginsignup").then(() =>
  console.log("Connected to MongoDB")
);

// Set up view engine and paths
const templatesPath = path.join(__dirname, "../tempelates");
app.set("views", templatesPath);
app.set("view engine", "hbs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Middleware
app.use("/", authRoutes);

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
