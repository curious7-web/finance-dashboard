import React from "react";

const ToggleGroup = ({ value, onChange, options }) => {
  return (
    <div className="inline-flex rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`px-4 py-2 focus:outline-none ${
            value === opt.value
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleGroup;
