import { Button, Card, CardContent, CardOverflow, CircularProgress, Divider } from '@mui/joy';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from "../../Shared/hooks/useUser";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import { getItinerariesForUser } from '../api';
import ItineraryListItem from './ItineraryListItem';

function ItineraryList() {
    const [expanded, setExpanded] = useState(false);
    const { user } = useUser();
    const { call, isPending } = usePending();
    const { setErrorMessage } = useFeedback();

    const [itineraries, setItineraries] = useState([]);

    const isEmpty = itineraries.length === 0;
    const pastTrips = itineraries.filter(itinerary => itinerary.isPast);
    const upcomingTrips = itineraries.filter(itinerary => !itinerary.isPast);

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
    
    useEffect(() => {
        if (user.id) {
            loadItineraries(user.id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card
            variant="soft"
            color="neutral"

        >
            <CardOverflow sx={{ p: 0 }}>
                <Button
                    level="h3"
                    sx={{ textAlign: 'center', mb: 2 }}
                    onClick={() => setExpanded(!expanded && !isEmpty)}
                    variant="solid"
                    color="neutral"
                    endDecorator={isEmpty ? null : expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                >
                    Upcoming Trips:
                </Button>
            </CardOverflow>
            {isPending ? <CircularProgress sx={{ m: 2 }} /> : 
                <CardContent>
                    {upcomingTrips.length > 0 ?
                        <ItineraryListItem itinerary={upcomingTrips[0]} />
                        : <Divider sx={{ my: 2 }} > 
                            {isEmpty ? "No trips on file." : "No upcoming trips."}
                        </Divider>}
                        {expanded && (
                            <>
                                {upcomingTrips.slice(1).map((itinerary) => (
                                    <ItineraryListItem key={itinerary.date} itinerary={itinerary} />
                                ))}
                                {pastTrips.length > 0 && (
                                    <>
                                        <Divider sx={{ my: 2 }} > Past Trips </Divider>
                                        {pastTrips.map((itinerary) => (
                                            <ItineraryListItem key={itinerary.date} itinerary={itinerary} />
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                </CardContent>}
        </Card>
    );
}

export default ItineraryList;