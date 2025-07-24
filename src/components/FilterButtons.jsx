import React from "react";

const FilterButtons = ({ filter, setFilter, clearAll, darkMode }) => {
  const filters = ["all", "completed", "pending"];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-1 rounded-md font-semibold transition-colors duration-200 ${
            filter === f
              ? darkMode
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-white text-black"
              : darkMode
              ? "bg-gray-700 text-gray-400 hover:bg-gray-400 hover:text-gray-900"
              : "bg-[#c9d1c9] text-[#14555f] hover:bg-white hover:text-[#14534f]"
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
      <button
        onClick={clearAll}
        className={`px-4 py-1 rounded-md font-semibold transition-colors duration-200 ${
          darkMode
            ? "bg-gray-700 text-gray-400 hover:bg-gray-400 hover:text-gray-900"
            : "bg-[#c9d1c9] text-[#14555f] hover:bg-white hover:text-[#14534f]"
        }`}
      >
        Clear All
      </button>
    </div>
  );
};

export default FilterButtons;

