import { Autocomplete, CircularProgress, Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem, Tooltip, Typography } from "@mui/joy";
import { Add, Delete, Share } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import { getUsersForItinerary, getUserOptions, shareItinerary, unShareItinerary } from "../api";
import { useUser } from "../../Shared/hooks/useUser";
import EasyModal from "../../Shared/components/EasyModal";

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
    const [shareUser, setShareUser] = useState();

    const handleUnShareModalOpen = useCallback((userInput) => {
        setUnShareUser(userInput);
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
        setUserOptions(prev => [...prev, unShareUser].sort((a, b) => a.userName.localeCompare(b.userName))); //Add the deleted user back to available options
    }, [setSuccessMessage, unShareUser]);

    const unShare = async () => {
        await call(() => unShareItinerary(itinerary.id, unShareUser.userId))
            .then(() => handleUnShareSuccess())
            .catch(error => setErrorMessage("Failed to unshare itinerary: " + error.message));
    };

    const handleShareSuccess = useCallback((user) => {
        setSuccessMessage(`Shared itinerary with ${user.userName}`);
        setUserOptions(prev => prev.filter((u) => u.userId !== user.userId)); // Remove the shared user from options
        setUsers(prev => [...prev, user].sort((a, b) => a.userName.localeCompare(b.userName))); // Add the new user to the list of shared users
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
                            users.map((u) => (
                                <Tooltip key={u.userId} title={`Un-Share with ${u.userName}`} placement="right">
                                    <MenuItem key={u.userId} onClick={() => handleUnShareModalOpen(u)}>
                                        <ListItemDecorator>
                                            <Delete color="danger"/>
                                        </ListItemDecorator>
                                        {u.userName}
                                    </MenuItem>
                                </Tooltip>
                            ))
                        )}
                </Menu>
            </Dropdown>
            <EasyModal 
                title={"Un-Share Itinerary"}
                body={
                    <>
                        {isPending
                            ? <CircularProgress size="lg" variant="plain" />
                            : <Typography>
                                Are you sure you want to un-share this itinerary with {unShareUser?.userName}?
                            </Typography>
                        }
                    </>
                }
                buttonText="Un-Share"
                buttonProps={{
                    variant: "solid",
                    color: "danger",
                }}
                isOpen={isUnShareModalOpen}
                onClose={() => handleUnShareModalClose()}
                buttonAction={unShare}
            />
            <EasyModal 
                title={"Share Itinerary"}
                body={
                    <>
                        <Typography>
                            Select a user to share this itinerary with.
                        </Typography>
                        <Autocomplete
                            autoFocus={true}
                            options={filteredUserOptions}
                            getOptionLabel={(option) => option.userName}
                            onChange={(event, newValue) => {
                                setShareUser(newValue);
                            }}
                        />
                    </>
                }
                buttonText="Share"
                buttonProps={{
                    variant: "solid",
                    color: "primary",
                }}
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                buttonAction={() => share(shareUser)}
            />
        </>
    );
}
export default ShareMenu;