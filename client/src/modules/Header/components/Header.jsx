import { Avatar, Button, Stack, Typography } from "@mui/joy";
import Logo from "../../Shared/components/Logo";
import DisplayName from "./DisplayName";

export default function Header() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Logo />
      <Stack
        direction="row"
        justifyContent="flex-end"
        gap={1}
        alignItems="center"
      >
        <DisplayName />
        <Avatar variant="soft" size="sm" />
      </Stack>
    </Stack>
  );
}
