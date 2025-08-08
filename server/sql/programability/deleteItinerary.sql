CREATE PROCEDURE deleteItinerary(IN itineraryId INT)
BEGIN
    DELETE FROM Itineraries
    WHERE id = itineraryId;
END;