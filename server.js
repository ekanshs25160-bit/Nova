import express from "express";
import fetch from "node-fetch"; // Node 25 can use global fetch, but keeping this as per your initial setup
import cors from "cors";

const app = express();
app.use(cors());

// Shodan API Key moved to backend for security
const API_KEY = "AOYylflEuHvji089I1SDt62Q0nnfonVP";

// API route
app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    const url = `https://api.shodan.io/shodan/host/${query}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch data from Shodan" });
  }
});

app.listen(3000, () => {
  console.log("Backend server running on http://localhost:3000");
});