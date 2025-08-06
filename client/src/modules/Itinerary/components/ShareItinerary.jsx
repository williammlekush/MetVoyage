import { CircularProgress, Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem, Tooltip } from "@mui/joy";
import { Add, Delete, Share } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import UnShareModal from "./UnShareModal";
import { getUsersForItinerary, unShareItinerary } from "../api";

function ShareItinerary({itinerary}) {

    const { call, isPending } = usePending();
    const { setErrorMessage, setSuccessMessage } = useFeedback();
    const [users, setUsers] = useState([]);
    const [userOptions, setUserOptions] = useState([]);

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isUnShareModalOpen, setIsUnShareModalOpen] = useState(false);
    const [unShareUser, setUnShareUser] = useState();

    const handleUnShareModalOpen = useCallback((user) => {
        setUnShareUser(user);
        setIsUnShareModalOpen(true);
    }, []);

    const handleUnShareModalClose = useCallback(() => {
        setUnShareUser(undefined);
        setIsUnShareModalOpen(false);
    }, []);

    // #region API calls
    const loadUsers = async () => {
        await call(() => getUsersForItinerary(itinerary.id))
            .then((response) => setUsers(response.data[0]))
            .catch((error) => setErrorMessage("Failed to load users: " + error.message));
    };

    const handleUnShareSuccess = useCallback(() => {
        setSuccessMessage(`Unshared itinerary with ${unShareUser.userName}`);
        setUsers({...users, unShareUser});
        setUnShareUser(undefined);
    }, [unShareUser, users, setSuccessMessage]);

    const unShare = async (user) => {
        await call(() => unShareItinerary(itinerary.id, user.userId))
            .then(() => handleUnShareSuccess())
            .catch(error => setErrorMessage("Failed to unshare itinerary: " + error.message));
    };
    // #endregion

    useEffect(() => {
        if (itinerary && itinerary.id) {
            loadUsers();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: {
                        variant: 'solid',
                        color: 'neutral',
                        size: 'md' } }}
                    placement="right-start"
                >
                    <Share />
                </MenuButton>
                <Menu>
                    <Tooltip title={`Share with new user`} placement="right">
                        <MenuItem onClick={() => setIsShareModalOpen(true)}>
                            <ListItemDecorator>
                                <Add />
                            </ListItemDecorator>
                            Share
                        </MenuItem>
                    </Tooltip>
                    {isPending ? <CircularProgress size="lg" variant="plain" />
                        : users.length > 0 && (
                            users.map((user) => (
                                <Tooltip key={user.userId} title={`Un-Share with ${user.userName}`} placement="right">
                                    <MenuItem key={user.userId} onClick={() => handleUnShareModalOpen(user)}>
                                        <ListItemDecorator>
                                            <Delete color="danger"/>
                                        </ListItemDecorator>
                                        {user.userName}
                                    </MenuItem>
                                </Tooltip>
                            ))
                        )}
                </Menu>
            </Dropdown>
            <UnShareModal
                isOpen={isUnShareModalOpen}
                onClose={() => handleUnShareModalClose()}
                onUnShare={unShare}
                user={unShareUser}
            />
        </>
    );
}
export default ShareItinerary;