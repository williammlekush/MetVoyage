CREATE PROCEDURE getObjectsForItinerary(IN itineraryId INT)
BEGIN
    SELECT Objects.*,
        Images.url,
        Images.public_caption
    FROM Includes
    LEFT JOIN Objects ON Includes.object_id = Objects.id
    LEFT JOIN Images ON Objects.id = Images.object_id
    WHERE Includes.itinerary_id = itineraryId;
END;