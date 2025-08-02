import { Avatar, Stack, Typography } from "@mui/joy";
import { useUser } from "../../Shared/hooks/useUser";
import Logo from "../../Shared/components/Logo";

export default function Header() {
  const { user } = useUser();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Logo />
      <Stack
        direction="row"
        justifyContent="flex-end"
        gap={2}
        alignItems="center"
      >
        <Typography>{user?.name}</Typography>
        <Avatar variant="soft" size="sm" />
      </Stack>
    </Stack>
  );
}
