import { createContext, useContext } from "react";

// Create a context for the user
export const UserContext = createContext();

// Custom hook to use user state in any component
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
