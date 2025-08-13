import { useState, useCallback } from "react";
import {
  Dropdown,
  IconButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import { Add, Favorite, MoreVert } from "@mui/icons-material";
import axios from "axios";
import { getItineraries } from "../api";
import SelectItineraryModal from "./SelectItineraryModal";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import { useUser } from "../../Shared/hooks/useUser";

function ArtCardActionMenu({ art }) {
  const { user, setUser } = useUser();
  // #region state
  const isFavoriteDisabled = user.favorite === art.id;

  const [itineraryLookups, setItineraryLookups] = useState([]);

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
        console.log(response.data);
        if (response.status === 200 && response.data[0][0]?.affected_rows > 0) {
          setSuccessMessage("Art favorited successfully.");
          console.log(response.data);
          if (response.data[1][0]?.url) {
            setUser({ ...user, favorite: response.data[1][0].url });
          }
        } else {
          setErrorMessage("Art not favorited :-(");
        }
      })
      .catch((error) => setErrorMessage(error));
  }, [art.id, user, setErrorMessage, setUser, setSuccessMessage]);
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
          slotProps={{
            root: {
              variant: "solid",
              color: "neutral",
              size: "sm",
              sx: {
                position: "absolute",
                zIndex: 10,
                borderRadius: "50%",
                right: "0.5rem",
                bottom: 0,
                transform: "translateY(50%)",
              },
            },
          }}
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
              <Favorite color={isFavoriteDisabled ? "neutral" : "danger"} />
            </ListItemDecorator>
            Favorite Art
          </MenuItem>
        </Menu>
      </Dropdown>
      <SelectItineraryModal
        art={art}
        itineraryLookups={itineraryLookups}
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default ArtCardActionMenu;
