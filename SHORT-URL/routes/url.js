const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleGenerateAnalytics,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGenerateAnalytics); // Added :shortId parameter

module.exports = router;
