import { Avatar } from "@mui/joy";
import { useUser } from "../../Shared/hooks/useUser";

export default function UserAvatar() {
  const { user } = useUser();
  return <Avatar variant="soft" size="sm" src={user?.favorite} />;
}
