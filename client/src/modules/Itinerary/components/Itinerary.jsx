import { Alert, Typography } from "@mui/joy";
import { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import { usePending } from "../../Shared/hooks/usePending";
import { useUser } from "../../Shared/hooks/useUser";
import { getItineraryById } from "../api";
import { formatDate } from "../../Shared/utils/stringHelpers";
import Header from "../../Header/components/Header";

function Itinerary() {
    // #region navigation/location
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    // #endregion

    // #region state
    const { user } = useUser();

    const [itinerary, setItinerary] = useState();
    const isEditEnabled = itinerary?.owner_id === user.id;

    const { call, isPending } = usePending();
    const { setErrorMessage, setSuccessMessage } = useFeedback();

    const AlertText = "Itinerary not found: either the record does not exist, or you do not have permission to view the itinerary."
    // #endregion

    // #region API calls
    const loadItinerary = useCallback(async (id) => {
        await call(() => getItineraryById(id, user.id))
            .then((response) => setItinerary(response.data[0][0]))
            .catch((error) => setErrorMessage("Failed to load itinerary: " + error.message));
    }, [call, setErrorMessage, user.id]);

    // #endregion

    // #region useEffects
    useEffect(() => {
    if (id > 0 && !isNaN(id)) {
        loadItinerary(id);
    } else {
        setErrorMessage("Invalid ID provided.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // #endregion

    return (
        <>
            <Header />
            {itinerary ? (
                <Typography level="h1" sx={{ textAlign: 'center', mt: 4 }}>
                    {isEditEnabled ? "Edit: " : ""} {formatDate(itinerary.date)}
                </Typography>
            ) : (
                <Alert color="danger">{AlertText}</Alert>
            )}
        </>
    );
}

export default Itinerary;
