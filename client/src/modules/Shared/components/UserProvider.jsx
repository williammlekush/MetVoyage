import { useCallback, useState } from "react";
import { UserContext } from "../hooks/useUser";

// Provider component to wrap your app
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null means not signed in

  const setUserFromDb = useCallback(
    (userFromDb) =>
      setUser({
        id: userFromDb.id,
        name: userFromDb.display_name,
        favorite: userFromDb.favorite_obj_id,
      }),
    []
  );

  return (
    <UserContext.Provider value={{ user, setUser, setUserFromDb }}>
      {children}
    </UserContext.Provider>
  );
}
