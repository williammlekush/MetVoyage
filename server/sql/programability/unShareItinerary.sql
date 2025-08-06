CREATE PROCEDURE unShareItinerary(IN itineraryId INT, IN userId INT)
BEGIN
   DELETE FROM Can_View
   WHERE user_id = userId AND itinerary_id = itineraryId;
END;