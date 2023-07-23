import { PropsWithChildren, createContext, useContext, useState } from "react";

export enum Operators {
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
export type FilterCondition = [string, Operators, FilterValue];

type ContextState = {
  filters: FilterCondition[];
  setFilters(value: FilterCondition[]): void;
};

export const FilterContext = createContext<ContextState | null>(null);

export const FilterProvider = (props: PropsWithChildren) => {
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {props.children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("Please use filter provider in the parent element");
  }

  return context;
};
