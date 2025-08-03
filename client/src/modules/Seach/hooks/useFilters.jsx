import { createContext, useContext } from "react";

// Create a context for the user
export const FiltersContext = createContext();

// Custom hook to use user state in any component
export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
}
