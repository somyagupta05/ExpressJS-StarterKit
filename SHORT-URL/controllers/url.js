const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  let shortId;
  let isUnique = false;
  const maxRetries = 10; // Limit the number of retries
  let attempts = 0;

  while (!isUnique && attempts < maxRetries) {
    shortId = shortid.generate(); // Generate a short ID
    const existingEntry = await URL.findOne({ shortId }); // Check for duplicates
    if (!existingEntry) {
      isUnique = true; // Found a unique ID
    }
    attempts++;
  }

  if (!isUnique) {
    return res.status(500).json({
      error: "Could not generate a unique ShortId after multiple attempts.",
    });
  }

  try {
    // Create new URL entry
    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.status(201).json({ id: shortId });
  } catch (error) {
    console.error("Error while creating a new short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGenerateAnalytics(req, res) {
  const shortId = req.params.shortId; // Corrected typo
  try {
    const result = await URL.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.error("Error while retrieving analytics:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGenerateAnalytics,
};
