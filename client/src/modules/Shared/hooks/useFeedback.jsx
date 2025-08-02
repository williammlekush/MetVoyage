import { Feedback } from "@mui/icons-material";
import { createContext, useContext } from "react";

// Create a context for the user
export const FeedbackContext = createContext();

// Custom hook to use user state in any component
export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
}
