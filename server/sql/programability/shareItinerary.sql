CREATE PROCEDURE shareItinerary(IN itineraryId INT, IN userId INT)
BEGIN
   INSERT INTO Can_View (user_id, itinerary_id)
   VALUES (userId, itineraryId);
END;