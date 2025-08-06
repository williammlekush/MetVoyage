CREATE PROCEDURE getItineraryById(IN itineraryId INT, IN userId INT)
BEGIN
    SELECT Itineraries.id,
        Itineraries.date,
        Itineraries.owner_id,
        CASE WHEN Itineraries.date < CURDATE() THEN 1
            ELSE 0
        END AS isPast
    FROM Itineraries
    LEFT JOIN Can_View ON Can_View.itinerary_id = Itineraries.id
    WHERE Itineraries.id = itineraryId
        AND (Can_View.user_id = userId OR Itineraries.owner_id = userId);
END;