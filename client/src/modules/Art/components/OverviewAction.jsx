import { useState, useCallback } from "react";
import { Box, Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem } from "@mui/joy";
import { Add, Favorite, MoreVert } from "@mui/icons-material";
import axios from "axios";
import { getItineraries } from "../api";

function OverviewAction({ art, user}) {

    // #region state
    const isFavoriteDisabled = user.fav === art.id;
    const [itineraryLookups, setItineraryLookups] = useState([]);
    // #endregion

    // #region api calls
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

    const handleAddToItinerary = useCallback(async () => {
        await getItineraries();
    }, []);

    return (
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
            <Menu placement="left-start">
                <MenuItem onClick={getItineraries}>
                    <ListItemDecorator>
                        <Add />
                    </ListItemDecorator>
                    Add to itinerary
                </MenuItem>
                <MenuItem disabled={isFavoriteDisabled} onClick={favoriteArt}>
                    <ListItemDecorator>
                        <Favorite color={isFavoriteDisabled ? "neutral" :"danger"}/>
                    </ListItemDecorator>
                    Favorite Art
                </MenuItem>
            </Menu>
        </Dropdown>
    );
}

export default OverviewAction;