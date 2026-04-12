const ips = [
  { ip_str: "8.8.8.8", org: "Google", ports: [53, 443, 853], location: { country_name: "United States" } },
  { ip_str: "8.8.4.4", org: "Google", ports: [53, 443, 853], location: { country_name: "United States" } },
  { ip_str: "1.1.1.1", org: "Cloudflare", ports: [53, 80, 443], location: { country_name: "Australia" } },
  { ip_str: "1.0.0.1", org: "Cloudflare", ports: [53, 80, 443], location: { country_name: "Australia" } },
  { ip_str: "9.9.9.9", org: "Quad9", ports: [53, 853], location: { country_name: "Switzerland" } },
  { ip_str: "208.67.222.222", org: "OpenDNS", ports: [53, 443, 5353], location: { country_name: "United States" } },
  { ip_str: "208.67.220.220", org: "OpenDNS", ports: [53, 443, 5353], location: { country_name: "United States" } },
  { ip_str: "4.2.2.1", org: "Level3", ports: [53], location: { country_name: "United States" } },
  { ip_str: "4.2.2.2", org: "Level3", ports: [53], location: { country_name: "United States" } },
  { ip_str: "64.6.64.6", org: "Verisign", ports: [53, 443], location: { country_name: "United States" } },
  { ip_str: "64.6.65.6", org: "Verisign", ports: [53, 443], location: { country_name: "United States" } },
  { ip_str: "77.88.8.8", org: "Yandex", ports: [53, 80, 443], location: { country_name: "Russia" } },
  { ip_str: "77.88.8.1", org: "Yandex", ports: [53, 80, 443], location: { country_name: "Russia" } },
  { ip_str: "185.228.168.9", org: "CleanBrowsing", ports: [53, 443], location: { country_name: "United States" } },
  { ip_str: "185.228.169.9", org: "CleanBrowsing", ports: [53, 443], location: { country_name: "United States" } }
];



async function fetchData() {
  const query = document.getElementById("search-input").value;
  if (!query) return;

  const container = document.getElementById("results-grid");
  container.innerHTML = "Loading...";

  try {
    const url = `/api/search?q=${encodeURIComponent(query)}`;
    
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


document.getElementById("search-btn").addEventListener("click", fetchData);

function populateFilters() {
    const countrySet = new Set();
    const orgSet = new Set();
    const portSet = new Set();
    
    ips.forEach(item => {
        if (item.location?.country_name) countrySet.add(item.location.country_name);
        if (item.org) orgSet.add(item.org);
        if (item.ports) {
            item.ports.forEach(p => portSet.add(p));
        }
    });

    const countryFilter = document.getElementById("country-filter");
    const orgFilter = document.getElementById("org-filter");
    const portFilter = document.getElementById("port-filter");

    countryFilter.innerHTML = '<option value="">All Countries</option>';
    orgFilter.innerHTML = '<option value="">All Organizations</option>';
    portFilter.innerHTML = '<option value="">All Ports</option>';

    countrySet.forEach(c => countryFilter.innerHTML += `<option value="${c}">${c}</option>`);
    orgSet.forEach(o => orgFilter.innerHTML += `<option value="${o}">${o}</option>`);
    portSet.forEach(p => portFilter.innerHTML += `<option value="${p}">${p}</option>`);
}

function renderFilteredIps() {
    const country = document.getElementById("country-filter").value;
    const org = document.getElementById("org-filter").value;
    const port = document.getElementById("port-filter").value;
    
    let filtered = ips;
    
    if (country) {
        filtered = filtered.filter(item => item.location?.country_name === country);
    }
    if (org) {
        filtered = filtered.filter(item => item.org === org);
    }
    if (port) {
        filtered = filtered.filter(item => item.ports && item.ports.includes(Number(port)));
    }
    
    const container = document.getElementById("results-grid");
    container.innerHTML = "";
    
    if (filtered.length === 0) {
        container.innerHTML = "<div style='text-align: center; grid-column: 1/-1;'>No nodes match these filters.</div>";
        return;
    }
    
    filtered.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <h3 class="ip-address">${item.ip_str}</h3>
                <p>Org: ${item.org || "N/A"}</p>
                <p>Ports: ${item.ports ? item.ports.join(", ") : "N/A"}</p>
                <p>Country: ${item.location?.country_name || "Unknown"}</p>
            </div>
        `;
    });
}

document.getElementById("country-filter").addEventListener("change", renderFilteredIps);
document.getElementById("org-filter").addEventListener("change", renderFilteredIps);
document.getElementById("port-filter").addEventListener("change", renderFilteredIps);

// Execute on load to populate the dashboard instantly
populateFilters();
renderFilteredIps();