import { useState, useCallback, useEffect } from "react";
import { Box, Card, CardContent, CardOverflow, Divider, Snackbar } from "@mui/joy";
import ArtCardBasicInfo from "./ArtCardBasicInfo";
import ArtCardFooter from "./ArtCardFooter";
import ArtCardOverflow from "./ArtCardOverflow";
import ArtDetails from "./ArtDetails";
import OverviewAction from "./OverviewAction";
import { getArt, getArtAggregateData, getArtist } from "../api";

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

                const artAggregateResponse = await getArtAggregateData(id);
                if (artAggregateResponse.status === 200) {
                    artData.favoriteCount = artAggregateResponse.data[0][0].favorite_count;
                    artData.itineraryCount = artAggregateResponse.data[0][0].itinerary_count;
                }

                setArt(artData);
                setIsArtLoading(false);

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
                                ButtonComponent={() => (
                                    <OverviewAction art={art} user={user}/>
                                )}
                            />
                            <ArtCardBasicInfo
                                art={art}
                                artist={artist}
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