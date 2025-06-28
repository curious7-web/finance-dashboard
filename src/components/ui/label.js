import React from "react";

const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-1 font-medium text-gray-700 dark:text-gray-300 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
