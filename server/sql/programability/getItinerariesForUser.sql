CREATE PROCEDURE getItinerariesForUser(IN userId INT)
BEGIN
    SELECT DISTINCT Itineraries.id,
        Itineraries.date,
        Itineraries.owner_id,
        COALESCE(NULLIF(Users.display_name, ''), Users.user_name) AS ownerName,
        CASE WHEN Itineraries.date < CURDATE() THEN 1
            ELSE 0
        END AS isPast
    FROM Itineraries
    LEFT JOIN Can_View ON Can_View.itinerary_id = Itineraries.id
    LEFT JOIN Users ON Users.id = Itineraries.owner_id
    WHERE Can_View.user_id = userId OR Itineraries.owner_id = userId
    ORDER BY Itineraries.date;
END;