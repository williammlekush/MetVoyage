import { Button, Card, CardContent, CardOverflow, CircularProgress, Divider } from '@mui/joy';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useUser } from "../../Shared/hooks/useUser";
import { useItinerary } from '../../Shared/hooks/useItinerary';
import ItineraryListItem from './ItineraryListItem';

function ItineraryList() {
    const [expanded, setExpanded] = useState(false);
    const { user } = useUser();

    const { itineraries, loadItineraries, areItinerariesPending } = useItinerary();

    const isEmpty = itineraries.length === 0;
    const pastTrips = itineraries.filter(itinerary => itinerary.isPast);
    const upcomingTrips = itineraries.filter(itinerary => !itinerary.isPast);
    
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
            sx={{ mt: 2 }}
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
            {areItinerariesPending ? <CircularProgress sx={{ m: 2 }} /> : 
                <CardContent>
                    {upcomingTrips.length > 0 ?
                        <ItineraryListItem itinerary={upcomingTrips[0]} />
                        : <Divider sx={{ my: 2 }} > 
                            {isEmpty ? "No trips on file." : "No upcoming trips."}
                        </Divider>}
                        {expanded && (
                            <>
                                {upcomingTrips.slice(1).map((itinerary) => (
                                    <ItineraryListItem key={itinerary.id} itinerary={itinerary} />
                                ))}
                                {pastTrips.length > 0 && (
                                    <>
                                        <Divider sx={{ my: 2 }} > Past Trips </Divider>
                                        {pastTrips.map((itinerary) => (
                                            <ItineraryListItem key={itinerary.id} itinerary={itinerary} />
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