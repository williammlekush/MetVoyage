import { useCallback } from "react";
import { useState } from "react";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import { searchObjects } from "../api";
import { SearchContext } from "../hooks/useSearch";

export default function SearchProvider({ children }) {
  const [filters, setFilters] = useState();
  const [objects, setObjects] = useState([]);

  const { call, isPending } = usePending();
  const { setErrorMessage } = useFeedback();

  const search = useCallback(
    async (searchFilters = filters) =>
      call(async () => await searchObjects(searchFilters))
        .then((response) => setObjects(response.data))
        .catch((error) =>
          setErrorMessage(error?.response?.data ?? error.message)
        ),
    [call, filters, setErrorMessage]
  );

  const setFiltersAndSearch = useCallback(
    (newFilter) => {
      setFilters((prev) => {
        const updated = { ...prev, ...newFilter };
        search(updated);
        return updated;
      });
    },
    [search]
  );

  return (
    <SearchContext.Provider
      value={{
        objects,
        search,
        setFiltersAndSearch,
        searchIsPending: isPending,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
