import { Stack, Typography } from "@mui/joy";
import { useUser } from "../../Shared/hooks/useUser";
import Logo from "../../Shared/components/Logo";

export default function Header() {
  const { user } = useUser();

  return (
    <Stack direction="row" justifyContent="space-between">
      <Logo />
      <Typography>{user?.id ?? "red"}</Typography>
    </Stack>
  );
}
