import { Box, Stack } from "@mui/joy";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../Shared/components/Logo";
import DisplayName from "./DisplayName";
import UserAvatar from "./UserAvatar";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isOverviewPage = location.pathname === "/Overview";
  const handleLogoClick = useCallback(() => {
    navigate("/Overview");
  }, [navigate]);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {isOverviewPage
        ? <Logo />
        : <Box
            onClick={handleLogoClick}
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Logo />
          </Box>
      }
      <Stack
        direction="row"
        justifyContent="flex-end"
        gap={1}
        alignItems="center"
      >
        <DisplayName />
        <UserAvatar />
      </Stack>
    </Stack>
  );
}
