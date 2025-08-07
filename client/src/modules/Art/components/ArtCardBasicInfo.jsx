import { CardContent, Stack, Tooltip, Typography } from "@mui/joy";
import { Face, Person } from "@mui/icons-material";
import { capitalize } from "../../Shared/utils/stringHelpers";

function ArtCardBasicInfo({ art, artist }) {
  const artistCaption = capitalize(
    (artist.artist_prefix ? artist.artist_prefix + " " : "") + artist.name
  );

  return (
    <Stack
      direction="column"
      gap={1}
      paddingTop={2}
      sx={{
        justifyContent: "space-between",
        alignItems: "space-between",
        height: "auto",
      }}
    >
      <Tooltip title={art.title || ""}>
        <Typography
          level="title-sm"
          color="primary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {art.title ? art.title : "No title on record."}
        </Typography>
      </Tooltip>
      <Tooltip title={artistCaption}>
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
        >
          {artist.id ? artist.name : "No artist on record."}
        </Typography>
      </Tooltip>
    </Stack>
  );
}

export default ArtCardBasicInfo;
