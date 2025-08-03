import { useState, useCallback } from "react";
import { Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem, Snackbar } from "@mui/joy";
import { Add, Favorite, MoreVert } from "@mui/icons-material";
import axios from "axios";
import { getItineraries } from "../api";
import ItineraryModal from "./ItineraryModal";

function OverviewAction({ art, user, setApiError}) {

    // #region state
    const isFavoriteDisabled = user.fav === art.id;

    const [itineraryLookups, setItineraryLookups] = useState([]);

    const [message, setMessage] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
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
    }, [art.id, setApiError, user.id]);
    // #endregion

    const handleAddToItinerary = useCallback(async () => {
        handleOpenModal();
        await getItineraries(user.id, art.id)
            .then((response) => {
                if (response.status === 200) {
                    setItineraryLookups(response.data[0]);
                }
            })
            .catch((error) => setApiError(error));
    }, [art.id, setApiError, user.id]);

    return (
        <>
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
                    <MenuItem onClick={handleAddToItinerary}>
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
            <ItineraryModal
                art={art}
                itineraryLookups={itineraryLookups}
                modalOpen={modalOpen}
                handleCloseModal={handleCloseModal}
            />
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

export default OverviewAction;