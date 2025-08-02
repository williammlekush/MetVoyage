import { useUser } from "../../Shared/hooks/useUser";

export default function Header() {
  const { user } = useUser();

  return <>{user?.id ?? "red"}</>;
}
