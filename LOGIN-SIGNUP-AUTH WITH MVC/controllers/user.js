const collection = require("../models/user"); // Import the model directly

// Signup Controller
const signupUser = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      password: req.body.password,
    };
    await collection.create(data); // Use `create` to insert data
    res.render("home");
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send("An error occurred during signup.");
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });
    if (check && check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("Wrong username or password");
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("An error occurred during login.");
  }
};

module.exports = { signupUser, loginUser };
