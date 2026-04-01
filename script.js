const API_KEY = "AOYylflEuHvji089I1SDt62Q0nnfonVP";


async function fetchData() {
  const query = document.getElementById("search-input").value;
  if (!query) return;

  const container = document.getElementById("results-grid");
  container.innerHTML = "Loading...";

  try {
    const url = `https://api.shodan.io/shodan/host/${query}?key=${API_KEY}`;
    const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    const res = await fetch(proxy);
    const data = await res.json();

    displayData(data);

  } catch (error) {
    container.innerHTML = "Failed to fetch data";
    console.error(error);
  }
}

function displayData(data) {
  const container = document.getElementById("results-grid");

  if (!data || !data.ip_str) {
    container.innerHTML = "No data found";
    return;
  }

  container.innerHTML = `
    <div class="card">
      <h3>${data.ip_str}</h3>
      <p>Org: ${data.org || "N/A"}</p>
      <p>Ports: ${data.ports ? data.ports.join(", ") : "N/A"}</p>
      <p>Country: ${data.location?.country_name || "Unknown"}</p>
    </div>
  `;
}

// Button click
document.getElementById("search-btn").addEventListener("click", fetchData);