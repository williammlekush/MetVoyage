import { useCallback, useEffect, useState } from "react";
import { usePending } from "../../../Shared/hooks/usePending";
import { Autocomplete, CircularProgress, Tooltip } from "@mui/joy";
import { Listbox } from "./Listbox/Listbox";
import { useSearch } from "../../hooks/useSearch";

export default function Filter({
  id,
  Icon,
  label,
  getOptions,
  getOptionLabel,
  tooltip,
}) {
  const [options, setOptions] = useState([]);
  const [getFailed, setGetFailed] = useState(false);

  const { setFiltersAndSearch } = useSearch();

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
        id={id}
        placeholder={label}
        noOptionsText={getFailed ? "Failed to load options" : "No options"}
        options={options.map((option) => getOptionLabel(option))}
        renderOption={(props, option) => [props, option]}
        limitTags={3}
        size="sm"
        sx={{ fontSize: "xs" }}
        slots={{ listbox: Listbox }}
        startDecorator={Icon}
        endDecorator={
          isPending ? (
            <CircularProgress
              size="sm"
              sx={{ bgcolor: "background.surface" }}
              variant="soft"
              color="neutral"
            />
          ) : null
        }
        loading={isPending}
        disabled={isPending}
        filterSelectedOptions
        autoComplete
        disableListWrap
        onChange={(_e, value) => setFiltersAndSearch({ [id]: value })}
      />
    </Tooltip>
  );
}
