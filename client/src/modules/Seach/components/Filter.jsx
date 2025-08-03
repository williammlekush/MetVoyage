import { useCallback, useEffect, useState } from "react";
import { usePending } from "../../Shared/hooks/usePending";
import { useFilters } from "../hooks/useFilters";
import { Autocomplete, CircularProgress, Tooltip } from "@mui/joy";

export default function Filter({ id, Icon, label, getOptions, tooltip }) {
  const [options, setOptions] = useState([]);
  const [getFailed, setGetFailed] = useState(false);

  const { filters, setFilters } = useFilters();

  const { call, isPending } = usePending();

  const fetchOptions = useCallback(
    async () =>
      await call(async () => await getOptions())
        .then((response) => setOptions(response.data))
        .catch(() => setGetFailed(true)),
    [call, getOptions]
  );

  useEffect(() => {
    if (!options.length) fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tooltip title={tooltip} placement="top-start">
      <Autocomplete
        mutliple
        id={id}
        placeholder={label}
        noOptionsText={getFailed ? "Failed to load options" : "No options"}
        options={options}
        limitTags={3}
        size="sm"
        sx={{ maxWidth: "160px", fontSize: "xs" }}
        startDecorator={Icon}
        endDecorator={
          isPending ? (
            <CircularProgress
              size="sm"
              sx={{ bgcolor: "background.surface" }}
            />
          ) : null
        }
        loading={isPending}
        disabled={isPending}
        filterSelectedOptions
        autoComplete
        onChange={(_e, value) => setFilters({ ...filters, [id]: value })}
      />
    </Tooltip>
  );
}
