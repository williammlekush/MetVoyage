import { useState, useCallback, useEffect } from "react";
import { Box, Card, CardContent, CardOverflow, Divider } from "@mui/joy";
import ArtCardBasicInfo from "./ArtCardBasicInfo";
import ArtCardFooter from "./ArtCardFooter";
import ArtCardOverflow from "./ArtCardOverflow";
import ArtDetails from "./ArtDetails";
import ArtCardActionMenu from "./ArtCardActionMenu";
import { getArt, getArtAggregateData, getArtist } from "../api";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";

function ArtCard({ id, user }) {

    // #region state
    const [art, setArt] = useState({});
    const [artist, setArtist] = useState({});

    const [expanded, setExpanded] = useState(false);
    // #endregion

    // #region API calls
    const { call, isPending } = usePending();

    // Track loading state separately to link API calls
    const { setErrorMessage } = useFeedback();

    const loadArt = useCallback(async (id) => {
        try {
            await call(() => getArt(id))
                .then(async (artResponse) => {
                    const artData = artResponse.data[0][0];

                    await call(() => getArtAggregateData(id))
                        .then((artAggregateResponse) => {
                            if (artAggregateResponse.status === 200) {
                                artData.favoriteCount = artAggregateResponse.data[0][0].favorite_count;
                                artData.itineraryCount = artAggregateResponse.data[0][0].itinerary_count;
                            }
                        })
                        .catch((error) => {
                            setErrorMessage(error);
                        });

                    setArt(artData);

                    // Use artData directly here
                    if (artData) {
                        await call(() => getArtist(id))
                            .then((artistResponse) => {
                                if (artistResponse.status === 200) {
                                    setArtist(artistResponse.data[0][0]);
                                } else {
                                    setErrorMessage("No artist found :-(");
                                }
                            })
                            .catch((error) => {
                                setErrorMessage(error);
                            });
                    }
                })
                .catch(() => {
                    setErrorMessage(`Art ID ${id} not found :-(`);
                });
        } catch (error) {
            setErrorMessage(error);
        }
    }, [call, setErrorMessage]);
    // #endregion

    // #region useEffects
    useEffect(() => {
    if (id > 0 && !isNaN(id)) {
        loadArt(id);
    } else {
        setErrorMessage("Invalid ID provided.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
                                isArtLoading={art.id ? isPending : true}
                                ButtonComponent={() => (
                                    <ArtCardActionMenu art={art} user={user} />
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
        </>
    );
}

export default ArtCard;