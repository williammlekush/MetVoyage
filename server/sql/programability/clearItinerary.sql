CREATE PROCEDURE clearItinerary(IN itineraryId INT)
BEGIN
    DELETE FROM Includes
    WHERE itinerary_id = itineraryId;
    SELECT ROW_COUNT() AS deletedCounts;
END;