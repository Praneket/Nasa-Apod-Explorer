const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cache = require("../lib/cache");
const router = express.Router();

const NASA_BASE = "https://api.nasa.gov/planetary/apod";
const apiKey = process.env.NASA_API_KEY;

async function extractVideoFromHtml(pageUrl) {
  try {
    const res = await axios.get(pageUrl);
    const $ = cheerio.load(res.data);

    const mp4 = $("video source").attr("src");

    if (mp4) {
      return "https://apod.nasa.gov/apod/" + mp4;
    }

    return null;
  } catch (err) {
    console.error("Video extraction error:", err.message);
    return null;
  }
}

function buildKey(url) {
  return url;
}

async function fetchFromNasa(params = {}) {
  const qs = new URLSearchParams({ api_key: apiKey, ...params }).toString();
  const full = `${NASA_BASE}?${qs}`;

  const key = buildKey(full);
  const cached = cache.get(key);
  if (cached) return cached;

  const res = await axios.get(full, { timeout: 10000 });
  let data = res.data;

  if (data.media_type === "video") {
    if (data.url.includes("youtube.com") || data.url.includes("vimeo.com")) {
    }

    else if (data.url.includes("apod.nasa.gov")) {
      const realVideo = await extractVideoFromHtml(data.url);
      if (realVideo) {
        data.url = realVideo;
      }
    }
  }

  cache.set(key, data);
  return data;
}

router.get("/today", async (req, res) => {
  try {
    const data = await fetchFromNasa({});
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(502).json({ error: "Failed to fetch APOD" });
  }
});

router.get("/", async (req, res) => {
  const { date } = req.query;

  try {
    const params = {};
    if (date) params.date = date;

    const data = await fetchFromNasa(params);
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: "Invalid request or failed to fetch" });
  }
});

router.get("/range", async (req, res) => {
  const { start_date, end_date } = req.query;

  if (!start_date || !end_date) {
    return res.status(400).json({ error: "start_date and end_date required" });
  }

  try {
    const data = await fetchFromNasa({ start_date, end_date });
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(502).json({ error: "Failed to fetch range" });
  }
});

module.exports = router;
