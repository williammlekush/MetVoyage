CREATE PROCEDURE getItineraries(IN userId INT,IN objectId INT)
BEGIN
    SELECT Itineraries.id,
        Itineraries.date,
        CASE WHEN Includes.object_Id IS NULL THEN 1
            ELSE 0
        END AS can_add
    FROM Itineraries
    INNER JOIN Users ON Users.id = Itineraries.owner_id
    LEFT JOIN Includes ON Includes.itinerary_id = Itineraries.id
        AND Includes.object_Id = objectId
    WHERE Users.id = userId AND Itineraries.date > NOW()
    ORDER BY Itineraries.date;
END;