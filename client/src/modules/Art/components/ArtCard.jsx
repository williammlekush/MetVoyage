import { useState, useCallback, useEffect } from "react";
import { Box, Card, CardContent, CardOverflow, Divider, Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem, Snackbar, Tooltip, Typography } from "@mui/joy";
import { Add, Favorite, KeyboardDoubleArrowRight, KeyboardDoubleArrowLeft, Loyalty, PlaylistAddCheckCircle, MoreVert } from "@mui/icons-material";
import axios from "axios";
import ArtCardBasicInfo from "./ArtCardBasicInfo";
import ArtCardFooter from "./ArtCardFooter";
import ArtCardOverflow from "./ArtCardOverflow";
import ArtDetails from "./ArtDetails";
import { getArt,getArtAggregateData, getArtist } from "../api";

function ArtCard({ id, user }) {

    // #region state
    const [art, setArt] = useState({});
    const [artist, setArtist] = useState({});

    const [expanded, setExpanded] = useState(false);

    const [apiError, setApiError] = useState();
    const [message, setMessage] = useState("");

    const [isArtLoading, setIsArtLoading] = useState(true);
    // #endregion

    // #region API calls
    const loadArt = useCallback(async (id) => {
        try {
            const artResponse = await getArt(id);
            if (artResponse.status === 200) {
                const artData = artResponse.data[0][0];
                setArt(artData);
                setIsArtLoading(false);

                const artAggregateResponse = await getArtAggregateData(id);
                if (artAggregateResponse.status === 200) {
                    artData.favoriteCount = artAggregateResponse.data[0][0].favorite_count;
                    artData.itineraryCount = artAggregateResponse.data[0][0].itinerary_count;
                }

                // Use artData directly here
                if (artData) {
                    const artistResponse = await getArtist(id);
                    if (artistResponse.status === 200) {
                        const artistData = artistResponse.data[0][0];
                        setArtist(artistData);
                    } else {
                        setApiError("No artist found :-(");
                    }
                }
            } else {
                setApiError(`Art ID ${id} not found :-(`);
                setIsArtLoading(false);
            }
        } catch (error) {
            setApiError(error);
            setIsArtLoading(false);
        }
    }, []);

    const favoriteArt = useCallback(async () => {
        await axios
            .post("/api/object/favorite", { id: user.id, objectId: art.id })
            .then((response) => {
            if (response.status === 200 && response.data[0][0].affected_rows > 0) {
                setMessage("Art favorited successfully.");
            } else {
                setApiError("Art not favorited :-(");
            }
            })
            .catch((error) => setApiError(error));
    }, [art.id, user.id]);
    // #endregion

    // #region useEffects
    useEffect(() => {
    if (id > 0 && !isNaN(id)) {
        loadArt(id);
    } else {
        setApiError("Invalid ID provided.");
    }
    }, [id, loadArt]);
    // #endregion

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    width: expanded ? 600: 300,
                    overflow:'hidden',
                    pb: 0
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <Box sx={{ flex: 1}}>
                        <CardOverflow>
                            <ArtCardOverflow
                                art={art}
                                isArtLoading={isArtLoading}
                                user={user}
                                favoriteArt={favoriteArt}
                                ButtonComponent={() => (
                                    <Dropdown>
                                        <MenuButton
                                            slots={{ root: IconButton }}
                                            slotProps={{ root: {
                                                variant: 'solid',
                                                color: 'neutral',
                                                size: 'md',
                                                sx: {
                                                    position: 'absolute',
                                                    zIndex: 10,
                                                    borderRadius: '50%',
                                                    right: '1rem',
                                                    bottom: 0,
                                                    transform: 'translateY(50%)', } } }}
                                        >
                                            <MoreVert />
                                        </MenuButton>
                                        <Menu placement="right-start">
                                            <MenuItem>
                                            <ListItemDecorator>
                                                <Add />
                                            </ListItemDecorator>
                                            Add to itinerary
                                            </MenuItem>
                                            <MenuItem disabled={user.fav === art.id} onClick={favoriteArt}>
                                            <ListItemDecorator>
                                                <Favorite />
                                            </ListItemDecorator>
                                            Favorite Art
                                            </MenuItem>
                                        </Menu>
                                    </Dropdown>
                                )}
                            />
                            <ArtCardBasicInfo
                                art={art}
                                artist={artist}
                                isArtLoading={isArtLoading}
                                user={user}
                                favoriteArt={favoriteArt}
                                expanded={expanded}
                                setExpanded={setExpanded}
                            />
                        </CardOverflow>
                    </Box>
                    {expanded && <Box sx={{ pl: 2, flex: 1}}>
                        <Divider orientation="vertical" flexItem />
                        <CardContent>
                            <ArtDetails
                                art={art}
                                artist={artist}
                            />
                        </CardContent>
                    </Box>}
                </Box>
                <ArtCardFooter
                    art={art}
                    expanded={expanded}
                    setExpanded={setExpanded}
                />
            </Card>
            <Snackbar
                open={!!apiError}
                onClose={() => setApiError(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                color="danger"
                variant="soft"
            >
                {apiError}
            </Snackbar>
            <Snackbar
                open={!!message}
                onClose={() => setMessage(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                color="success"
                variant="soft"
            >
                {message}
            </Snackbar>
        </>
    );
}

export default ArtCard;