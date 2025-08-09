CREATE PROCEDURE getObjectsForItinerary(IN itineraryId INT)
BEGIN
    SELECT Objects.*
    FROM Includes
    LEFT JOIN Objects ON Includes.object_id = Objects.id
    WHERE Includes.itinerary_id = itineraryId;
END;