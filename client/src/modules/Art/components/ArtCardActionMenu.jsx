import { useState, useCallback } from "react";
import { Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem, Snackbar } from "@mui/joy";
import { Add, Favorite, MoreVert } from "@mui/icons-material";
import axios from "axios";
import { getItineraries } from "../api";
import SelectItineraryModal from "./SelectItineraryModal";
import { useFeedback } from "../../Shared/hooks/useFeedback";

function ArtCardActionMenu({ art, user}) {

    // #region state
    const isFavoriteDisabled = user.fav === art.id;

    const [itineraryLookups, setItineraryLookups] = useState([]);

    const [message, setMessage] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    // #endregion

    // #region api calls
    const { setErrorMessage, setSuccessMessage } = useFeedback();

    const favoriteArt = useCallback(async () => {
        await axios
            .post("/api/object/favorite", { id: user.id, objectId: art.id })
            .then((response) => {
            if (response.status === 200 && response.data[0][0].affected_rows > 0) {
                setSuccessMessage("Art favorited successfully.");
            } else {
                setErrorMessage("Art not favorited :-(");
            }
            })
            .catch((error) => setErrorMessage(error));
    }, [art.id, setErrorMessage, setSuccessMessage, user.id]);
    // #endregion

    const handleAddToItinerary = useCallback(async () => {
        handleOpenModal();
        await getItineraries(user.id, art.id)
            .then((response) => {
                if (response.status === 200) {
                    setItineraryLookups(response.data[0]);
                }
            })
            .catch((error) => setErrorMessage(error));
    }, [art.id, setErrorMessage, user.id]);

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
            <SelectItineraryModal
                art={art}
                user={user}
                itineraryLookups={itineraryLookups}
                modalOpen={modalOpen}
                handleCloseModal={handleCloseModal}
                setMessage={setMessage}
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

export default ArtCardActionMenu;