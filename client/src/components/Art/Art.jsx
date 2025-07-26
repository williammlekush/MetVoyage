import { useState, useCallback, useEffect } from "react";
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Snackbar from '@mui/joy/Snackbar';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import axios from "axios";

function Art() {
    const [art, setArt] = useState({});
    const [artist, setArtist] = useState({});

    const artistInfo = artist.artist_prefix + " " + artist.name;

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
                        {art.id ? art.title : "No art found."}
                    </Typography>
                    <Typography level="h3" color="neutral">
                        {artist.id ? artistInfo : "No artist found."}
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
                        <b>First</b> tab panel
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
