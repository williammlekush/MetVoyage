import { Dropdown, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@mui/joy";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import ThemePicker from "./ThemePicker";
import EasyModal from "../../Shared/components/EasyModal";

function HeaderMenu() {
    const navigate = useNavigate();

    const [openThemeModal, setOpenThemeModal] = useState(false);

    // Navigate to Auth page, and clear the history
    const handleLogout = useCallback(() => {
        window.history.replaceState(null, '', '/');
        window.history.pushState(null, '', '/');
        window.onpopstate = function () {
          window.history.pushState(null, '', '/');
        }
        navigate("/", {replace: true});
    }, [navigate]);

    return (
      <>
       <Dropdown>
          <MenuButton
              slots={{ root: IconButton }}
          >
              <UserAvatar />
          </MenuButton>
          <Menu
            sx={{ p: 0 }}
            placement="right-start"
          >
            <MenuList variant="plain" onClick={(event) => event.stopPropagation()}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem onClick={() => setOpenThemeModal(true)} >Change Theme</MenuItem>
            </MenuList>
          </Menu>
        </Dropdown>
        <EasyModal
            isOpen={openThemeModal}
            setOpen={setOpenThemeModal}
            title="Change Theme"
            body={<ThemePicker />}
            buttonText="Close"
            buttonAction={() => setOpenThemeModal(false)}
            onClose={() => setOpenThemeModal(false)}
          />
      </>
    )
}

export default HeaderMenu;