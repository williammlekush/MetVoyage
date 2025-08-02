import { useCallback, useEffect, useState } from "react";
import { UserContext } from "../hooks/useUser";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

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
