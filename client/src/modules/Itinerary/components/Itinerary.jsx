import { Alert, Typography } from "@mui/joy";
import { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import { usePending } from "../../Shared/hooks/usePending";
import { useUser } from "../../Shared/hooks/useUser";
import { getItineraryById } from "../api";
import { formatDate } from "../../Shared/utils/stringHelpers";

function Itinerary() {
    // #region navigation/location
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const { user } = useUser();

    const [itinerary, setItinerary] = useState();

    const { call, isPending } = usePending();
    const { setErrorMessage, setSuccessMessage } = useFeedback();
    // #endregion

    // #region API calls
    const onSuccess = useCallback((data) => {
        if (data)
            setItinerary(data);
        else
            setErrorMessage("No itinerary found.");
    }, [setItinerary, setErrorMessage]);

    const loadItinerary = useCallback(async (id) => {
        await call(() => getItineraryById(id, user.id))
            .then((response) => onSuccess(response.data[0][0]))
            .catch((error) => setErrorMessage("Failed to load itinerary: " + error.message));
    }, [call, onSuccess, setErrorMessage, user.id]);

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
            {itinerary ? (
                <Typography level="h1" sx={{ textAlign: 'center', mt: 4 }}>
                    {formatDate(itinerary.date)}
                </Typography>
            ) : (
                <Alert color="danger">Itinerary not found: either the record does not exist, or you do not have permission to view the itinerary.</Alert>
            )}
        </>
    );
}

export default Itinerary;
