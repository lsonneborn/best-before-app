import React from "react";

interface CategoryFilterProps {
  value: string;
  onChange: (category: string) => void;
}

const CategoryFilter = ({ value, onChange }: CategoryFilterProps) => {
  return (
    <select
      className="dropdowns"
      onChange={(e) => onChange(e.target.value)}
      placeholder="category"
    >
      <option value=""></option>
      <option value="food">food</option>
      <option value="cosmetics">cosmetics</option>
      <option value="houseware">housewares</option>
      <option value="pharmaceuticals">pharmaceuticals</option>
      <option value="other">other</option>
    </select>
  );
};

export default CategoryFilter;
