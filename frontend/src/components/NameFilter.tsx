interface NameFilterProps {
  input: string;
  onChange: (keyword: string) => void;
}

const NameFilter = ({ input, onChange }: NameFilterProps) => {
  return (
    <input
      type="search"
      value={input}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search item"
    />
  );
};

export default NameFilter;
