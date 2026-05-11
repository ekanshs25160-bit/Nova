import React from "react";

const FilterContainer = ({ filters, onFilterChange }) => {
  return (
    <div className="max-w-6xl mx-auto mb-8 flex justify-center gap-6 flex-wrap px-4">
        <select 
            className="bg-[#10141c]/70 text-[#e0e6ed] border border-white/10 px-4 py-2.5 rounded-lg cursor-pointer text-sm focus:outline-none focus:border-[#00f2ff] appearance-none min-w-[160px]"
            value={filters.country}
            onChange={(e) => onFilterChange('country', e.target.value)}
        >
          <option value="">All Countries</option>
        </select>

        <select 
            className="bg-[#10141c]/70 text-[#e0e6ed] border border-white/10 px-4 py-2.5 rounded-lg cursor-pointer text-sm focus:outline-none focus:border-[#00f2ff] appearance-none min-w-[160px]"
            value={filters.org}
            onChange={(e) => onFilterChange('org', e.target.value)}
        >
          <option value="">All Organizations</option>
        </select>

        <select 
            className="bg-[#10141c]/70 text-[#e0e6ed] border border-white/10 px-4 py-2.5 rounded-lg cursor-pointer text-sm focus:outline-none focus:border-[#00f2ff] appearance-none min-w-[160px]"
            value={filters.port}
            onChange={(e) => onFilterChange('port', e.target.value)}
        >
          <option value="">All Ports</option>
        </select>
    </div>
  );
};

export default FilterContainer;
