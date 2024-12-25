const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/user");

// Routes for authentication
router.get("/signup", (req, res) => res.render("signup"));
router.post("/signup", signupUser);

router.get("/", (req, res) => res.render("login"));
router.post("/login", loginUser);

module.exports = router;
