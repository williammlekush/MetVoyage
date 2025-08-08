import { Stack, Tooltip, Typography } from "@mui/joy";
import { Face } from "@mui/icons-material";
import { capitalize } from "../../Shared/utils/stringHelpers";
import ArtistNameDisplay from "./ArtistNameDisplay";

function ArtCardBasicInfo({ art, artists }) {
  const nameCaptions = artists
    .filter((artist) => !!artist.name)
    .map((artist) => ({
      name: artist.name,
      caption: capitalize(
        (artist.artist_prefix ? artist.artist_prefix + " " : "") + artist.name
      ),
    }));

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
      {nameCaptions.length === 0 ? (
        <ArtistNameDisplay
          name={"No artist on record"}
          sx={{ fontStyle: "italic", opacity: 0.6 }}
        />
      ) : (
        nameCaptions.map((artist, index) => (
          <Tooltip title={artist.caption}>
            <ArtistNameDisplay key={index} name={artist.name} />
          </Tooltip>
        ))
      )}
    </Stack>
  );
}

export default ArtCardBasicInfo;
