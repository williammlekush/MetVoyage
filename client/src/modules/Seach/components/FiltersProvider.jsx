import { useMemo, useState } from "react";
import { FiltersContext } from "../hooks/useFilters";
import Filter from "./Filter";
import { Category } from "@mui/icons-material";
import { getNameOptions } from "../api";

export default function FiltersProvider({ children }) {
  const [filters, setFilters] = useState();

  const possibleFilters = useMemo(
    () => [
      {
        id: "name",
        Icon: <Category />,
        label: "Name",
        getOptions: getNameOptions,
        tooltip: "Filter by name of the object",
      },
    ],
    []
  );

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {possibleFilters.map((filter) => (
        <Filter key={filter.id} {...filter} />
      ))}
      {children}
    </FiltersContext.Provider>
  );
}
