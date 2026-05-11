import React from "react";

const SearchContainer = ({ value, onChange, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="max-w-3xl mx-auto my-12 flex gap-4 px-4 w-full">
        <input 
            type="text" 
            className="flex-1 bg-[#10141c]/70 border border-white/10 p-4 rounded-xl text-white font-mono text-lg focus:outline-none focus:border-[#00f2ff] focus:ring-1 focus:ring-[#00f2ff]/30 transition-all" 
            placeholder="Search IP, Port, or Org (e.g., 80, Apache, Google)..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
        />
        <button 
            className="bg-[#00f2ff] text-[#0a0c10] px-8 rounded-xl font-bold hover:translate-y-[-2px] hover:shadow-[0_5px_20px_rgba(0,242,255,0.3)] transition-all uppercase tracking-wider"
            onClick={onSearch}
        >
            Analyze
        </button>
    </div>
  );
};

export default SearchContainer;
