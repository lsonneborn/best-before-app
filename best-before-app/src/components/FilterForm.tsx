import { PropsWithChildren, createContext, useContext, useState } from "react";

// filter operators
export enum FilterOperators {
  equal = "eq",
  not_equal = "neq",
  contains = "cont",
  not_contains = "ncont",
  greater_than = "gt",
  less_than = "lt",
  before = "before",
  after = "after",
}

export type FilterValue = string | number | boolean | Date;
export type FilterCondition = [string, FilterOperators, FilterValue];

interface FilterFormProps {
  filterInStock: (stockStatus: string) => Item[];
}

const FilterForm = ({ filterInStock }: FilterFormProps) => {
  const [userInput, setUserInput] = useState({
    inStock: false,
  });

  const handleFilterChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setUserInput((prevFormData) => ({ ...prevFormData, [name]: inputValue }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFilterSubmit}>
      <label>
        At home?
        <select
          name="inStock"
          onChange={handleFilterChange}
          placeholder="At home?"
        >
          <option value=""></option>
          <option value="yes">yes</option>
          <option value="no">no</option>
        </select>
      </label>
      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </form>
  );
};

export default FilterForm;
