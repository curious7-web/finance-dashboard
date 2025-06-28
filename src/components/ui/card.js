import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={`rounded-2xl p-4 shadow-md bg-white dark:bg-[#1e1e1e] ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
