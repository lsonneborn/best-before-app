interface InStockFilterProps {
  value: boolean | undefined;
  onChange: (inStock: boolean | undefined) => void;
}

const InStockFilter = ({ value, onChange }: InStockFilterProps) => {
  return (
    <select
      className="dropdowns"
      value={value === undefined ? "" : value ? "yes" : "no"}
      onChange={(e) =>
        onChange(e.target.value === "" ? undefined : e.target.value === "yes")
      }
    >
      <option value=""></option>
      <option value="yes">yes</option>
      <option value="no">no</option>
    </select>
  );
};

export default InStockFilter;
