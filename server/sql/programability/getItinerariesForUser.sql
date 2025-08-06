CREATE PROCEDURE getItinerariesForUser(IN userId INT)
BEGIN
    SELECT Itineraries.id,
        Itineraries.date,
        CASE WHEN Itineraries.owner_id = userId THEN 1
            ELSE 0
        END AS isOwner,
        CASE WHEN Itineraries.date < CURDATE() THEN 1
            ELSE 0
        END AS isPast
    FROM Itineraries
    LEFT JOIN Can_View ON Can_View.itinerary_id = Itineraries.id
    WHERE Can_View.user_id = userId OR Itineraries.owner_id = userId
    ORDER BY Itineraries.date;
END;