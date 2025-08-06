import { CircularProgress, Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem, Tooltip } from "@mui/joy";
import { Add, Delete, Share } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import { getUsersForItinerary } from "../api";

function ShareItinerary({itinerary}) {

    const { call, isPending } = usePending();
    const { setErrorMessage, setSuccessMessage } = useFeedback();
    const [users, setUsers] = useState([]);
    const [userOptions, setUserOptions] = useState([]);

    // #region API calls
    const loadUsers = async () => {
        await call(() => getUsersForItinerary(itinerary.id))
            .then((response) => setUsers(response.data[0]))
            .catch((error) => setErrorMessage("Failed to load users: " + error.message));
    };
    // #endregion

    useEffect(() => {
        if (itinerary && itinerary.id) {
            loadUsers();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
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
                    <MenuItem>
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
                                <MenuItem key={user.userId}>
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
    );
}
export default ShareItinerary;