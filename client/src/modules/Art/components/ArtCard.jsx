import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Stack,
} from "@mui/joy";
import ArtCardBasicInfo from "./ArtCardBasicInfo";
import ArtCardFooter from "./ArtCardFooter";
import ArtCardOverflow from "./ArtCardOverflow";
import ArtDetails from "./ArtDetails";
import ArtCardActionMenu from "./ArtCardActionMenu";
import { Circle } from "@mui/icons-material";

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
            <CardContent
              sx={{
                position: "absolute",
                top: "5%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Stack direction="row" spacing={1}>
                {images.map((image, index) => (
                  <Button
                    key={index}
                    color="primary"
                    variant="soft"
                    sx={{
                      width: 12,
                      height: 12,
                      padding: 0,
                      paddingBlock: 0,
                      paddingInline: 0,
                      minHeight: 0,
                      bgcolor:
                        index === selectedImgIndex ? "#4393E4" : "aliceblue",
                      borderRadius: "100%",
                      boxShadow: "0 0 2px 1px grey",
                    }}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </Stack>
            </CardContent>
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
