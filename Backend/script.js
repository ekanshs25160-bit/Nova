async function fetchData() {
    const query = document.getElementById("search-input").value;
    if (!query) return;

    const container = document.getElementById("results-grid");
    container.innerHTML = `
        <div class="loading-container">
            <span class="loader"></span>
            <p>Scanning Network for "${query}"...</p>
        </div>
    `;

    try {
        const url = `/api/search?q=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
            container.innerHTML = `<div class="welcome-msg"><h2 style="color: var(--error)">Error</h2><p>${data.error}</p></div>`;
            return;
        }

        displayData(data, query);

    } catch (error) {
        container.innerHTML = `<div class="welcome-msg"><h2 style="color: var(--error)">Failed to connect</h2><p>${error.message}</p></div>`;
        console.error(error);
    }
}

function displayData(data, query) {
    const container = document.getElementById("results-grid");
    container.innerHTML = "";

    // Shodan Search returns { matches: [], total: ... }
    // Shodan Host lookup returns the host object directly
    let hosts = [];
    if (data.matches) {
        hosts = data.matches;
    } else if (data.ip_str) {
        hosts = [data];
    }

    if (hosts.length === 0) {
        container.innerHTML = `<div class="welcome-msg"><h2>No results found</h2><p>Zero matches for "${query}"</p></div>`;
        return;
    }

    hosts.forEach(host => {
        const card = document.createElement("div");
        card.className = "card";
        
        const ports = host.ports || (host.data ? [...new Set(host.data.map(d => d.port))] : []);
        const country = host.location?.country_name || host.country_name || "Unknown";
        const org = host.org || "Unknown Organization";
        const lastUpdate = host.last_update ? new Date(host.last_update).toLocaleDateString() : "N/A";

        card.innerHTML = `
            <div class="card-header">
                <h3>${host.ip_str || host.ip}</h3>
            </div>
            <div class="card-body">
                <p>Organization <span>${org}</span></p>
                <p>Country <span>${country}</span></p>
                <p>Ports <span>${ports.slice(0, 5).join(", ")}${ports.length > 5 ? "..." : ""}</span></p>
                <p>Last Seen <span>${lastUpdate}</span></p>
            </div>
            ${host.os ? `<p>OS <span>${host.os}</span></p>` : ''}
            ${host.isp ? `<p>ISP <span>${host.isp}</span></p>` : ''}
        `;
        container.appendChild(card);
    });
}

document.getElementById("search-btn").addEventListener("click", fetchData);
document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") fetchData();
});

// Example query click handlers
document.querySelectorAll(".examples span").forEach(span => {
    span.addEventListener("click", () => {
        const query = span.innerText.replace("Try: ", "").trim();
        document.getElementById("search-input").value = query;
        fetchData();
    });
});

// Initial welcome message or static data
// We can keep the filters if we want to filter the current results locally
function filterResults() {
    const country = document.getElementById("country-filter").value;
    const org = document.getElementById("org-filter").value;
    const port = document.getElementById("port-filter").value;
    
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        let visible = true;
        const text = card.innerText;
        
        if (country && !text.includes(country)) visible = false;
        if (org && !text.includes(org)) visible = false;
        if (port && !text.includes(port)) visible = false;
        
        card.style.display = visible ? "block" : "none";
    });
}

document.getElementById("country-filter").addEventListener("change", filterResults);
document.getElementById("org-filter").addEventListener("change", filterResults);
document.getElementById("port-filter").addEventListener("change", filterResults);