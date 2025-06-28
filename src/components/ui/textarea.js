import React from "react";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-[#2a2a2a] dark:text-white dark:border-gray-600 ${className}`}
    {...props}
  />
));

export default Textarea;
