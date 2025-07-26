import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {Box, Grid, IconButton, Snackbar, Typography} from '@mui/joy';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CssVarsProvider } from '@mui/joy/styles';
import axios from "axios";
import ArtDetails from "./ArtDetails";

function Art({ userId }) {
    // #region navigation/location
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id"); 
    // #endregion

    // #region state
    const [art, setArt] = useState({});
    const [artist, setArtist] = useState({});

    const artistCaption = (artist.artist_prefix ? artist.artist_prefix + " " : "")
            + artist.name;

    const [apiError, setApiError] = useState();
    const [message, setMessage] = useState("");
    // #endregion

    // #region API calls
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

    const favoriteArt = useCallback(async () => {
        await axios
        .post("/api/object/favorite", { id: userId, objectId: art.id })
        .then((response) => {
            if (response.status === 200 && response.data[0][0].affected_rows > 0) {
                setMessage("Art favorited successfully.");
            } else {
                setApiError("Art not favorited :-(");
            }
        })
        .catch((error) => setApiError(error));
    }, [art.id, userId]);
    // #endregion

    // #region useEffects
    useEffect(() => {
        if (id > 0 && !isNaN(id)) {
            loadArt(id);
        }
        else {
            setApiError("Invalid ID provided.");
        }
    }, [id, loadArt]);
    // #endregion

    return (
        <CssVarsProvider sx={{ margin:6, maxWidth:'100vw', p:2}}>
            <Grid
                container
                spacing={2}
                sx={{ flexGrow: 1}}
                alignItems="center"
                justifyContent={"center"}
            >
                <Grid item
                    size={6}
                    flexDirection="column"
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography level="h1" color="primary">
                            {art.title ? art.title : "No title on record."}
                        </Typography>
                        {userId > 0 && <IconButton onClick={favoriteArt}>
                            <FavoriteIcon color="danger" />
                        </IconButton>}
                    </Box>
                    <Typography level="h4" color="neutral">
                        {artist.id ? artistCaption : "No artist on record."}
                    </Typography>
                </Grid>
                    <Grid item xs={6}>
                        <Box
                            component="img"
                            src={art.url ? art.url : "https://placehold.co/400x300?text=No+image+on+record"}
                            alt={art.url ? art.publicCaption : "No image available."}
                            sx={{width: "100%", maxWidth: 600}}/>
                    </Grid>
            </Grid>
            <Box>
                <Typography level="h2">
                    Artwork Details
                </Typography>
                <ArtDetails art={art} artist={artist} />
            </Box>
            <Snackbar
                open={!!apiError}
                onClose={() => setApiError(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                color="danger"
                variant="soft"
            >
                {apiError}
            </Snackbar>
            <Snackbar
                open={!!message}
                onClose={() => setMessage(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                color="success"
                variant="soft"
            >
                {message}
            </Snackbar>
        </CssVarsProvider>
    );
}

export default Art;
