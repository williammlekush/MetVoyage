import { CircularProgress, Dropdown, IconButton, Menu, MenuButton, MenuItem, Tooltip, Typography } from "@mui/joy";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import { clearItinerary } from "../api";
import EasyModal from "../../Shared/components/EasyModal";

function DeleteMenu({itineraryId, refreshItinerary, clearDisabled}) {
    const { call, isPending } = usePending();
    const { setErrorMessage, setSuccessMessage } = useFeedback();

    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    console.log(itineraryId);

    // #region API calls
    const handleClearItinerarySuccess = () => {
        setSuccessMessage("Objects cleared from itinerary successfully.");
        refreshItinerary(itineraryId);
    };
    const handleClearItinerary = async () => {
        await call(() => clearItinerary(itineraryId))
            .then((response) => handleClearItinerarySuccess(response[0]))
            .catch((error) => setErrorMessage("Failed to clear itinerary: " + error.message));
    };
    // #endregion
    return (
        <>
            <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: {
                        variant: 'outlined',
                        color: 'danger',
                        size: 'md' } }}
                >
                    <Tooltip title="Delete or Clear Itinerary">
                        <Delete />
                    </Tooltip>  
                </MenuButton>
                <Menu
                    size="sm"
                    placement="right-start"
                >
                    <MenuItem onClick={() => setIsClearModalOpen(true)} disabled={clearDisabled}>
                        Clear
                    </MenuItem>
                    <MenuItem onClick={() => console.log("Delete itinerary")}>
                        Delete
                    </MenuItem>
                </Menu>
            </Dropdown>
            <EasyModal 
                title="Clear Itinerary"
                body={
                    <>
                        {isPending
                            ? <CircularProgress size="lg" variant="plain" />
                            : <Typography>
                                Clearing the itinerary will remove all objects from it. Are you sure?
                            </Typography>
                        }
                    </>
                }
                buttonText="Clear"
                buttonProps={{
                    variant: "solid",
                    color: "danger",
                }}
                isOpen={isClearModalOpen}
                onClose={() => setIsClearModalOpen(false)}
                buttonAction={handleClearItinerary}
            />
        </>
    )
};

export default DeleteMenu;