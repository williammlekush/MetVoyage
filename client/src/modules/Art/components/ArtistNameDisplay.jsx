import { Face } from "@mui/icons-material";
import { Typography } from "@mui/joy";

export default function ArtistNameDisplay({ name, ...rest }) {
  return (
    <Typography
      startDecorator={<Face sx={{ fontSize: "sm" }} />}
      level="body-sm"
      color="neutral"
      sx={{
        display: "-webkit-box",
        overflow: "hidden",
        textOverflow: "ellipsis",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
      }}
      {...rest}
    >
      {name}
    </Typography>
  );
}
