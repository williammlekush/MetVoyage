import { CircularProgress, Dropdown, IconButton, Menu, MenuButton, MenuItem, Tooltip, Typography } from "@mui/joy";
import { Delete } from "@mui/icons-material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import { clearItinerary, deleteItinerary } from "../api";
import EasyModal from "../../Shared/components/EasyModal";

function DeleteMenu({itineraryId, refreshItinerary, clearDisabled}) {
    const { call, isPending } = usePending();
    const { setErrorMessage, setSuccessMessage } = useFeedback();
    
    const navigate = useNavigate();

    const handleNavigate = useCallback(() => {
        navigate("/overview");
    }, [navigate]);

    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    console.log(itineraryId);

    // #region API calls
    const handleClearItinerarySuccess = useCallback(() => {
        setSuccessMessage("Objects cleared from itinerary successfully.");
        refreshItinerary(itineraryId);
    }, [itineraryId, refreshItinerary, setSuccessMessage]);

    const handleClearItinerary = async () => {
        await call(() => clearItinerary(itineraryId))
            .then((response) => handleClearItinerarySuccess(response[0]))
            .catch((error) => setErrorMessage("Failed to clear itinerary: " + error.message));
    };

    const handleDeleteItinerarySuccess = useCallback(() => {
        setSuccessMessage("Itinerary deleted successfully.");
        handleNavigate();
    }, [handleNavigate, setSuccessMessage]);

    const handleDeleteItinerary = async () => {
        await call(() => deleteItinerary(itineraryId))
            .then((response) => handleDeleteItinerarySuccess(response[0]))
            .catch((error) => setErrorMessage("Failed to delete itinerary: " + error.message));
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
                    <Delete />
                </MenuButton>
                <Menu
                    size="sm"
                    placement="right-start"
                >
                    <MenuItem onClick={() => setIsClearModalOpen(true)} disabled={clearDisabled}>
                        Clear
                    </MenuItem>
                    <MenuItem onClick={() => setIsDeleteModalOpen(true)}>
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
            <EasyModal 
                title="Delete Itinerary"
                body={
                    <>
                        {isPending
                            ? <CircularProgress size="lg" variant="plain" />
                            : <Typography>
                                Deleting the itinerary will remove it permanently. Are you sure?
                            </Typography>
                        }
                    </>
                }
                buttonText="Delete"
                buttonProps={{
                    variant: "solid",
                    color: "danger",
                }}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                buttonAction={handleDeleteItinerary}
            />
        </>
    )
};

export default DeleteMenu;