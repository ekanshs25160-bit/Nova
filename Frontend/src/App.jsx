import React, { useState } from "react";
import Header from "./components/Header";
import SearchContainer from "./components/SearchContainer";
import FilterContainer from "./components/FilterContainer";
import ResultCard from "./components/ResultCard";

const App = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ country: "", org: "", port: "" });

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        setResults([]);
      } else {
        if (data.matches) {
          setResults(data.matches);
        } else if (data.ip_str) {
          setResults([data]);
        } else {
          setResults([]);
        }
      }
    } catch (err) {
      setError("Failed to connect to the intelligence network.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleExampleClick = (example) => {
    const cleanQuery = example.replace("Try: ", "").trim();
    setQuery(cleanQuery);
    handleSearch(cleanQuery);
  };

  const filteredResults = results.filter(host => {
    const text = JSON.stringify(host).toLowerCase();
    const matchesCountry = !filters.country || text.includes(filters.country.toLowerCase());
    const matchesOrg = !filters.org || text.includes(filters.org.toLowerCase());
    const matchesPort = !filters.port || text.includes(filters.port.toLowerCase());
    return matchesCountry && matchesOrg && matchesPort;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0c10] text-[#e0e6ed]">
      <Header />
      
      <SearchContainer 
        value={query} 
        onChange={setQuery} 
        onSearch={() => handleSearch()} 
      />

      <FilterContainer 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />

      <main className="max-w-7xl mx-auto px-8 pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-20">
              <div className="w-12 h-12 border-4 border-white border-b-[#00f2ff] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-400 font-medium">Scanning Network for "{query}"...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-20">
              <h2 className="text-3xl font-bold text-red-500 mb-2">Access Denied</h2>
              <p className="text-slate-400">{error}</p>
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((host, index) => (
              <ResultCard key={host.ip_str || index} host={host} />
            ))
          ) : query ? (
            <div className="col-span-full text-center py-20">
              <h2 className="text-2xl font-bold mb-2">No Signals Found</h2>
              <p className="text-slate-400">Zero matches detected for "{query}"</p>
            </div>
          ) : (
            <div className="col-span-full text-center py-20">
              <h1 className="text-6xl font-black mb-6 tracking-tighter">Welcome to <span className="text-[#00f2ff]">Nova</span></h1>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">Enter a query above to explore real-time network intelligence across the global Shodan infrastructure.</p>
              <div className="flex justify-center gap-4 flex-wrap">
                {["port:80", "country:US", "product:Apache"].map(example => (
                  <span 
                    key={example}
                    onClick={() => handleExampleClick(example)}
                    className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl cursor-pointer hover:bg-white/10 hover:border-[#00f2ff] transition-all font-mono text-sm group"
                  >
                    Try: <code className="text-[#00f2ff] group-hover:text-white transition-colors">{example}</code>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;