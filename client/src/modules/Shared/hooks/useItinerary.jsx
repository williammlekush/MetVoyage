import { createContext, useContext } from "react";

// Create a context for the itineraries
export const ItineraryContext = createContext();

// Custom hook to use itinerary state in any component
export function useItinerary() {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error("useItinerary must be used within an ItineraryProvider");
  }
  return context;
}
