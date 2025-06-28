// src/components/DateFilter.js
import React from "react";

const DateFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center gap-3 my-4">
      <label className="text-gray-300 font-medium">Filter:</label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="bg-gray-800 text-white px-3 py-1 rounded-md border border-gray-600 focus:outline-none"
      >
        <option value="all">All Time</option>
        <option value="last30">Last 30 Days</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>
  );
};

export default DateFilter;
