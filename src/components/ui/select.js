import React from "react";

const Select = React.forwardRef(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={`w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:text-white dark:border-gray-600 ${className}`}
    {...props}
  >
    {children}
  </select>
));

export default Select;
