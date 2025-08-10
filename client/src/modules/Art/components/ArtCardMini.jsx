import { Box, Card, Stack, Tooltip, Typography } from "@mui/joy"
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useState } from "react";
import ArtCardOverflow from "./ArtCardOverflow";
import ArtDetails from "./ArtDetails";
import ArtCardImageSelector from "./ArtCardImageSelector";
import ArtCardFooter from "./ArtCardFooter";

function ArtCardMini ({object, actionChild, toggleExpanded}) {
    const [selectedImgIndex, setSelectedImageIndex] = useState(0);

    return (
        <Card variant="outlined" sx={{ mb: 2, pb: object.isExpanded ? 0 : 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Tooltip title={object.isExpanded ? "Click to collapse" : "Click to expand"} placement="right">
                    <Box
                        onClick={toggleExpanded}
                        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    >
                        <Typography level="title-sm" sx={{ mr: 1 }}>
                            {object.title}
                        </Typography>
                        {object.isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </Box>
                </Tooltip>
                {actionChild}
            </Stack>
            {object.isExpanded &&
                <>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "start" }}>
                        <Card variant="plain" sx={{ width: 300, position: "relative", p:0 }}>
                            <ArtCardOverflow
                                images={object.images}
                                isArtLoading={!object.id}
                                selectedIndex={selectedImgIndex}
                            />
                            {object.images.length > 1 &&
                                <ArtCardImageSelector
                                    images={object.images}
                                    selectedImgIndex={selectedImgIndex}
                                    setSelectedImageIndex={setSelectedImageIndex}
                                />
                            }
                        </Card>
                        <Box sx={{ ml: 2, width: "100%"}}>
                            <ArtDetails art={object} artist={object.artists[0]} />
                        </Box>
                    </Box>
                    <ArtCardFooter art={{ ...object, favoriteCount: object.favorite_count, itineraryCount: object.itinerary_count }} />
                </>
            }
        </Card>
    );
};

export default ArtCardMini;