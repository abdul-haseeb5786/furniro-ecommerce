// components/Select.js

import React from 'react';

export const Select = ({ children, ...props }) => (
  <select {...props} className="w-full p-2 border border-gray-300 rounded-md">
    {children}
  </select>
);

export const SelectTrigger = ({ children, ...props }) => (
  <div {...props} className="flex items-center justify-between bg-white border border-gray-300 rounded-md p-2">
    {children}
  </div>
);

export const SelectItem = ({ value, children, ...props }) => (
  <option value={value} {...props} className="p-2">
    {children}
  </option>
);

export const SelectValue = ({ children, ...props }) => (
  <div {...props} className="p-2">
    {children}
  </div>
);
