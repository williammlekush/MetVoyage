import { useState, useCallback, useEffect } from "react";
import {Box, Grid, Snackbar, Tab, TabList, TabPanel, Tabs, Typography} from '@mui/joy';
import MetadataItem from '../Shared/MetadataItem.jsx';
import axios from "axios";

function Art() {
    const [art, setArt] = useState({});
    const [artist, setArtist] = useState({});

    const artistInfo = (artist.artist_prefix ? artist.artist_prefix + " " : "")
            + artist.name;

    const artDetails = [
        {label: "Title", value: art.title},
        {label: "Artist", value: artistInfo},
        {label: "Date", value: art.date},
        {label: "Medium", value: art.medium},
        {label: "Dimensions", value: art.dimensions},
        {label: "Classification", value: art.classification},
        {label: "Credit Line", value: art.credit_line},
        {label: "Object Number", value: art.number},
    ]

    const [apiError, setApiError] = useState();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id"); 


    const loadArt = useCallback(async (id) => {
        await axios
        .get(`/api/object/read`, { params: { id } })
        .then((response) => {
            if (response.status === 200) setArt(response.data[0][0]);
            else setApiError("No art found :-(");
        })
        .catch((error) => setApiError(error));
        await axios
        .get(`/api/object/read/artist`, { params: { id } })
        .then((response) => {
            if (response.status === 200) {
                const artistData = response.data[0][0];
                setArtist(artistData);
            } else {
                setApiError("No artist found :-(");
            }
        })
        .catch((error) => setApiError(error));
    }, []);

    useEffect(() => {
        if (id > 0 && !isNaN(id)) {
            loadArt(id);
        }
    }, [id, loadArt]);

    return (
        <Box>
            <Grid
                container
                spacing={2}
                sx={{ flexGrow: 1}}
                alignItems="center"
                justifyContent={"center"}
            >
                <Grid
                    size={6}
                    flexDirection="column"
                >
                    <Typography level="h1" color="primary">
                        {art.title ? art.title : "No title on record."}
                    </Typography>
                    <Typography level="h4" color="neutral">
                        {artist.id ? artistInfo : "No artist on record."}
                    </Typography>
                </Grid>
                {art.url && (                
                    <Grid
                        size={6}
                    >
                        <Box
                            component="img"
                            src={art.url}
                            alt={art.publicCaption}
                            sx={{width: "100%", maxWidth: 600}}/>
                    </Grid>
                )}
            </Grid>
            <Box>
                <Typography level="h2" color="primary">
                        Artwork Details
                    </Typography>
                <Tabs orientation="vertical" defaultValue={0}>
                    <TabList>
                        <Tab>
                            Description
                        </Tab>
                        <Tab>
                            Origin
                        </Tab>
                    </TabList>
                    <TabPanel value={0}>
                        {artDetails.map((item, index) => (
                            <MetadataItem key={index} label={item.label} value={item.value} />
                        ))}
                    </TabPanel>
                    <TabPanel value={1}>
                        <b>Second</b> tab panel
                    </TabPanel>
                </Tabs>
            </Box>
            <Box>{JSON.stringify(art)}</Box>
            <Box>{JSON.stringify(artist)}</Box>
            <Snackbar
                open={!!apiError}
                autoHideDuration={6000}
                onClose={() => setApiError(null)}
                message={apiError ? apiError.message : ""}
            />
        </Box>
    );
}

export default Art;
