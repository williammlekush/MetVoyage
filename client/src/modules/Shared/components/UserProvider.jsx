import { useState } from "react";
import { UserContext } from "../hooks/useUser";

// Provider component to wrap your app
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null means not signed in

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
