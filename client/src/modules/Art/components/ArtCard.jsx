import { useState } from "react";
import {
  Box,
  Card,
  Divider,
} from "@mui/joy";
import ArtCardBasicInfo from "./ArtCardBasicInfo";
import ArtCardFooter from "./ArtCardFooter";
import ArtCardOverflow from "./ArtCardOverflow";
import ArtDetails from "./ArtDetails";
import ArtCardActionMenu from "./ArtCardActionMenu";
import ArtCardImageSelector from "./ArtCardImageSelector";

export default function ArtCard({ art, images, artists, isPending }) {
  const [expanded, setExpanded] = useState(false);

  const [selectedImgIndex, setSelectedImageIndex] = useState(0);

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
            images={images}
            isArtLoading={art.id ? isPending : true}
            selectedIndex={selectedImgIndex}
            ButtonComponent={() => <ArtCardActionMenu art={art} />}
          />
          {images.length > 1 && (
            <ArtCardImageSelector
              key={art.id}
              images={images}
              selectedIndex={selectedImgIndex}
              setSelectedIndex={setSelectedImageIndex}
            />
          )}
          <ArtCardBasicInfo art={art} artist={artists[0]} artists={artists} />
        </Box>
        {expanded && (
          <Box sx={{ pl: 2, flex: 1 }}>
            <Divider orientation="vertical" />
            <ArtDetails art={art} artist={artists[0]} />
          </Box>
        )}
      </Box>
      <ArtCardFooter art={art} expanded={expanded} setExpanded={setExpanded} />
    </Card>
  );
}
