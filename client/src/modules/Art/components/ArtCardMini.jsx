import { Box, Card, CardContent, Stack, Tooltip, Typography } from "@mui/joy"
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useState } from "react";
import ArtCardOverflow from "./ArtCardOverflow";
import ArtDetails from "./ArtDetails";
import ArtCardImageSelector from "./ArtCardImageSelector";
import ArtCardFooter from "./ArtCardFooter";

function ArtCardMini ({object, actionChild}) {
    const [expanded, setExpanded] = useState(false);
    const [selectedImgIndex, setSelectedImageIndex] = useState(0);

    return (
        <Card variant="outlined" sx={{ mb: 2, pb: expanded ? 0 : 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Tooltip title={expanded ? "Click to collapse" : "Click to expand"} placement="right">
                    <Box
                        onClick={() => setExpanded(!expanded)}
                        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    >
                        <Typography level="title-sm" sx={{ mr: 1 }}>
                            {object.title}
                        </Typography>
                        {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </Box>
                </Tooltip>
                {actionChild}
            </Stack>
            {expanded &&
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
                        <Box sx={{ ml: 2}}>
                            <ArtDetails art={object} artist={object.artists[0]} />
                        </Box>
                    </Box>
                    <ArtCardFooter art={object}/>
                </>
            }
        </Card>
    );
};

export default ArtCardMini;