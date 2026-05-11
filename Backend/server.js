import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname));

// Shodan API search endpoint
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  // Storing the API key inside the serverless function (Use env vars in production)
  const API_KEY = process.env.SHODAN_API_KEY || "AOYylflEuHvji089I1SDt62Q0nnfonVP";

  try {
    // Shodan search endpoint is /shodan/host/{ip} or /shodan/query/search
    // The user's original code used /shodan/host/${query}
    // Let's support both if possible, but stick to their logic first.
    const isIp = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(query);
    let url;
    
    if (isIp) {
        url = `https://api.shodan.io/shodan/host/${query}?key=${API_KEY}`;
    } else {
        url = `https://api.shodan.io/shodan/host/search?key=${API_KEY}&query=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch data from Shodan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
