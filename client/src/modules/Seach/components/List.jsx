import { useEffect } from "react";
import { CircularProgress, Stack, Typography } from "@mui/joy";
import { useSearch } from "../hooks/useSearch";

export default function List() {
  const { objects, search, searchIsPending } = useSearch();

  useEffect(() => {
    if (!objects.length) search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return searchIsPending ? (
    <CircularProgress size="lg" variant="plain" />
  ) : (
    <Stack direction="column" spacing={1}>
      {objects.length ? (
        objects.map((object) => (
          <Typography level="body-xs">{JSON.stringify(object)}</Typography>
        ))
      ) : (
        <Typography level="body-xs">No results found</Typography>
      )}
    </Stack>
  );
}
