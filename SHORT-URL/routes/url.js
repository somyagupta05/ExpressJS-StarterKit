const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleGenerateAnalytics,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);
router.get("/analytics", handleGenerateAnalytics);
module.exports = router;
