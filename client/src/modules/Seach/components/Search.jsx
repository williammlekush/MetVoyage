import Filters from "./Filters";
import List from "./List";
import SearchProvider from "./SearchProvider";

export default function Search() {
  return (
    <SearchProvider>
      <Filters />
      <List />
    </SearchProvider>
  );
}
