const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { keyword, location } = req.query;

  try {
    const response = await axios.get(
      "https://jsearch.p.rapidapi.com/search",
      {
        params: {
          query: `${keyword} in ${location}`,
          page: "1",
          num_pages: "1"
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
        }
      }
    );

    res.json(response.data.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
