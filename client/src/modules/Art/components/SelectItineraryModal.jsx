import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Autocomplete,
  IconButton,
  Button,
} from "@mui/joy";
import { Close } from "@mui/icons-material";
import { createFilterOptions } from "@mui/joy/Autocomplete";
import {
  formatDate,
  isFutureDateString,
  isValidDate,
} from "../../Shared/utils/stringHelpers";
import { createItinerary } from "../../Itinerary/api";
import { addToItinerary } from "../api";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import { useUser } from "../../Shared/hooks/useUser";
import { useItinerary } from "../../Shared/hooks/useItinerary";

function SelectItineraryModal({
  art,
  itineraryLookups,
  modalOpen,
  handleCloseModal,
}) {
  // #region state
  const { loadItineraries } = useItinerary();
  const { user } = useUser();
  const filter = createFilterOptions();
  const [value, setValue] = useState();
  // #endregion

  // #region handlers
  const { setErrorMessage, setSuccessMessage } = useFeedback();

  const handleResetModal = () => {
    setValue(null);
    handleCloseModal();
  };

  const handleAddToItinerary = () => {
    if (value) {
      // Handle adding to itinerary
      if (value.id === 0) {
        // Create new itinerary for the selected date
        createItinerary(user.id, value.date)
          .then((response) => {
            if (response.status === 200) {
              const newItinerary = response.data[0][0];
              // Add art to the new itinerary
              loadItineraries(); // Refresh itineraries
              addToItinerary(art.id, newItinerary.id)
                .then((response) => {
                  if (response.status === 200) {
                    setSuccessMessage(
                      "Art added to new itinerary successfully."
                    );
                  } else {
                    setErrorMessage("Failed to add art to new itinerary.");
                  }
                })
                .catch((error) => setErrorMessage(error));
            } else {
              setErrorMessage("Failed to create itinerary.");
            }
          })
          .catch((error) => setErrorMessage(error));
      } else {
        // Add to existing itinerary
        addToItinerary(art.id, value.id)
          .then((response) => {
            if (response.status === 200) {
              setSuccessMessage("Art added to itinerary successfully.");
            } else {
              setErrorMessage("Failed to add art to itinerary.");
            }
          })
          .catch((error) => setErrorMessage(error));
      }
      handleResetModal();
    }
  };
  // #endregion

  return (
    <Modal
      open={modalOpen}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        height: 200,
        backgroundColor: "background.paper",
        border: "2px solid #000",
        borderRadius: "12px",
        p: 4,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h3">Select an Itinerary.</Typography>
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </Box>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
          <Autocomplete
            options={itineraryLookups}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            getOptionDisabled={(option) => option.can_add === 0}
            getOptionLabel={(option) =>
              option.id === -1
                ? "Enter a valid date to create a new itinerary"
                : option.id === 0
                ? "Create new itinerary for " + formatDate(option.date)
                : "Trip on " +
                  formatDate(option.date) +
                  (option.can_add === 0 ? " (Already added)" : "")
            }
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              if (
                isValidDate(params.inputValue) &&
                isFutureDateString(params.inputValue) &&
                !filtered.some(
                  (option) => formatDate(option.date) === params.inputValue
                )
              ) {
                filtered.push({
                  id: 0,
                  date: params.inputValue + "T00:00:00",
                  can_add: 1,
                });
              } else if (
                params.inputValue !== "" &&
                !filtered.some(
                  (option) => formatDate(option.date) === params.inputValue
                )
              ) {
                filtered.push({
                  id: -1,
                  date: isValidDate(params.inputValue)
                    ? params.inputValue + "T00:00:00"
                    : "",
                  can_add: 0,
                });
              }
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
          >
            <Button variant="soft" color="neutral" onClick={handleResetModal}>
              Cancel
            </Button>
            <Button
              variant="solid"
              onClick={handleAddToItinerary}
              disabled={!value || value.id === -1}
            >
              {value && value.id === 0
                ? "Add to New Itinerary"
                : "Add to Itinerary"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default SelectItineraryModal;
