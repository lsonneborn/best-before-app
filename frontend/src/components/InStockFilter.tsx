import React from "react";

interface InStockFilterProps {
  value: boolean | null;
  onChange: (inStock: boolean | null) => void;
}

const InStockFilter = ({ value, onChange }: InStockFilterProps) => {
  return (
    <select
      className="dropdowns"
      value={value === null ? "" : value ? "yes" : "no"}
      onChange={(e) =>
        onChange(e.target.value === "" ? null : e.target.value === "yes")
      }
    >
      <option value=""></option>
      <option value="yes">yes</option>
      <option value="no">no</option>
    </select>
  );
};

export default InStockFilter;
