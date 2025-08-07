import { useState } from "react";
import { Box, Card, CardContent, CardOverflow, Divider } from "@mui/joy";
import ArtCardBasicInfo from "./ArtCardBasicInfo";
import ArtCardFooter from "./ArtCardFooter";
import ArtCardOverflow from "./ArtCardOverflow";
import ArtDetails from "./ArtDetails";
import ArtCardActionMenu from "./ArtCardActionMenu";

export default function ArtCard({ art, artist, isPending }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      variant="outlined"
      sx={{
        width: expanded ? 600 : 300,
        overflow: "hidden",
        paddingY: 0,
        justifyContent: "space-between",
        minHeight: 360,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Box sx={{ width: "100%", flex: 1 }}>
          <ArtCardOverflow
            art={art}
            isArtLoading={art.id ? isPending : true}
            ButtonComponent={() => <ArtCardActionMenu art={art} />}
          />
          <ArtCardBasicInfo art={art} artist={artist} />
        </Box>
        {expanded && (
          <Box sx={{ pl: 2, flex: 1 }}>
            <Divider orientation="vertical" />
            <ArtDetails art={art} artist={artist} />
          </Box>
        )}
      </Box>
      <ArtCardFooter art={art} expanded={expanded} setExpanded={setExpanded} />
    </Card>
  );
}
