const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortId = shortid.generate(); // Ensure this generates a value
  try {
    await URL.create({
      shortId: shortId, // Match this to your schema field
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.json({ id: shortId });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Duplicate ShortId detected." });
    }
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGenerateAnalytics(req, re) {
  const shortId = req.params.shorId;
  const result = await URL.findOne({ shortId });
  return res.jsn({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleGenerateAnalytics,
};
