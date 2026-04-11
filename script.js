
async function fetchData() {
  const query = document.getElementById("search-input").value;
  if (!query) return;

  const container = document.getElementById("results-grid");
  container.innerHTML = "Loading...";

  try {
    // Calling our local backend API instead of Shodan directly or via proxy
    const url = `http://localhost:3000/api/search?q=${encodeURIComponent(query)}`;
    
    const res = await fetch(url);
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