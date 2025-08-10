import { useCallback, useState } from "react";
import { ItineraryContext } from "../hooks/useItinerary";
import { getItinerariesForUser } from "../../Itinerary/api";
import { useUser } from "../../Shared/hooks/useUser";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";

export default function ItineraryProvider({ children }) {
    const [itineraries, setItineraries] = useState([]);
    const { user } = useUser();
    const { call, isPending } = usePending();
    const { setErrorMessage } = useFeedback();

    const onSuccess = useCallback((data) => {
        setItineraries(data);
    }, [setItineraries]);
  
    const loadItineraries = async () => {
    await call(() => getItinerariesForUser(user.id))
        .then((response) => {
            onSuccess(response.data[0]);
        })
        .catch((error) => {
            setErrorMessage("Failed to load itineraries: " + error.message);
        });
    };

    return (
        <ItineraryContext.Provider value={{ itineraries, loadItineraries, areItinerariesPending: isPending }}>
            {children}
        </ItineraryContext.Provider>
    );
}
