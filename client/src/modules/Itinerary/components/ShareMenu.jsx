import { CircularProgress, Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem, Tooltip } from "@mui/joy";
import { Add, Delete, Share } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import ShareModal from "./ShareModal";
import UnShareModal from "./UnShareModal";
import { getUsersForItinerary, getUserOptions, shareItinerary, unShareItinerary } from "../api";
import { useUser } from "../../Shared/hooks/useUser";

function ShareMenu({itinerary}) {

    const { call, isPending } = usePending();
    const { setErrorMessage, setSuccessMessage } = useFeedback();

    const { user } = useUser();
    const [users, setUsers] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const filteredUserOptions = Array.isArray(userOptions)
        ? userOptions.filter((option) => !users.some((user) => user.userId === option.userId) && option.userId !== user.id)
        : [];

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

    const loadCurrentUsers = async () => {
        await call(() => getUsersForItinerary(itinerary.id))
            .then((response) => setUsers(response.data[0]))
            .catch((error) => setErrorMessage("Failed to load users: " + error.message));
    };

    const loadUserOptions = async () => {
        await call(() => getUserOptions())
            .then((response) => setUserOptions(response.data[0]))
            .catch((error) => setErrorMessage("Failed to load user options: " + error.message));
    };

    const handleUnShareSuccess = useCallback(() => {
        setSuccessMessage(`Unshared itinerary with ${unShareUser.userName}`);
        setUsers(prev => prev.filter(user => user.userId !== unShareUser.userId)); // Remove the unshared user
        setUserOptions(prev => [...prev, unShareUser].sort()); //Add the deleted user back to available options
    }, [setSuccessMessage, unShareUser]);

    const unShare = async (user) => {
        await call(() => unShareItinerary(itinerary.id, user.userId))
            .then(() => handleUnShareSuccess())
            .catch(error => setErrorMessage("Failed to unshare itinerary: " + error.message));
    };

    const handleShareSuccess = useCallback((user) => {
        setSuccessMessage(`Shared itinerary with ${user.userName}`);
        setUserOptions(prev => prev.filter((u) => u.userId !== user.userId)); // Remove the shared user from options
        setUsers(prev => [...prev, user].sort()); // Add the new user to the list of shared users
    }, [setSuccessMessage]);

    const share = async (user) => {
        await call(() => shareItinerary(itinerary.id, user.userId))
            .then(() => handleShareSuccess(user))
            .catch(error => setErrorMessage("Failed to share itinerary: " + error.message));
    };
    // #endregion

    // #region useEffects
    useEffect(() => {
        if (itinerary && itinerary.id) {
            loadCurrentUsers();
            loadUserOptions();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // #endregion

    return (
        <>
            <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: {
                        variant: 'solid',
                        color: 'neutral',
                        size: 'md' } }}
                >
                    <Share />
                </MenuButton>
                <Menu placement="right-start">
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
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                onShare={share}
                userOptions={filteredUserOptions}
            />
        </>
    );
}
export default ShareMenu;