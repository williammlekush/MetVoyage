import { AutocompleteOption, Tooltip, Typography } from "@mui/joy";

const LISTBOX_PADDING = 10; // px

export default function Row(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  return (
    <Tooltip title={dataSet[1]} placement="right">
      <AutocompleteOption {...dataSet[0]} style={inlineStyle}>
        <Typography
          level="body-xs"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
            width: "100%",
          }}
        >
          {dataSet[1]}
        </Typography>
      </AutocompleteOption>
    </Tooltip>
  );
}
