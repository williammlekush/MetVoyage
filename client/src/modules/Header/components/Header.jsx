import { Stack, Typography } from "@mui/joy";
import { useUser } from "../../Shared/hooks/useUser";
import Logo from "../../Shared/components/Logo";

export default function Header() {
  const { user } = useUser();

  return (
    <Stack direction="row" justifyContent="space-between">
      <Logo />
      <Stack direction="row" justifyContent="flex-end" gap={2}>
        <Typography>{user?.name}</Typography>
        <Typography>{user?.favorite}</Typography>
      </Stack>
    </Stack>
  );
}
