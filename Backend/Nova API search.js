export default async function handler(req, res) {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  // Storing the API key inside the serverless function (Use env vars in production)
  const API_KEY = process.env.SHODAN_API_KEY || "AOYylflEuHvji089I1SDt62Q0nnfonVP";

  try {
    const url = `https://api.shodan.io/shodan/host/${query}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch data from Shodan" });
  }
}
