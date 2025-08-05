import { Button, Card, CardContent, CardOverflow, Divider } from '@mui/joy';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useState } from 'react';
import ItineraryListItem from './ItineraryListItem';

function ItineraryList() {
    const [expanded, setExpanded] = useState(false);

    const itineraries = [
        { date: "2023-10-01", isOwner: true, isPast: true },
        { date: "2025-11-02", isOwner: false, isPast: false },
        { date: "2025-12-03", isOwner: true, isPast: false },
    ];
    return (
        <Card
            variant="soft"
            color="neutral"

        >
            <CardOverflow sx={{ p: 0 }}>
                <Button
                    level="h3"
                    sx={{ textAlign: 'center', mb: 2 }}
                    onClick={() => setExpanded(!expanded)}
                    variant="solid"
                    color="neutral"
                    endDecorator={expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                >
                    Upcoming Trips:
                </Button>
            </CardOverflow>
            <CardContent>
                <ItineraryListItem itinerary={itineraries.filter(itinerary => !itinerary.isPast)[0]} />
                {expanded && (
                    <>
                        {itineraries.filter(itinerary => !itinerary.isPast).slice(1).map((itinerary) => (
                            <ItineraryListItem key={itinerary.date} itinerary={itinerary} />
                        ))}
                        {itineraries.some(itinerary => itinerary.isPast) && (
                            <>
                                <Divider sx={{ my: 2 }} > Past Trips </Divider>
                                {itineraries.filter(itinerary => itinerary.isPast).map((itinerary) => (
                                    <ItineraryListItem key={itinerary.date} itinerary={itinerary} />
                                ))}
                            </>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}

export default ItineraryList;