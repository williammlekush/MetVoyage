CREATE PROCEDURE addObjectToItinerary(IN objectId INT, IN itineraryId INT)
BEGIN
    -- Check if the object is already included in the itinerary
    IF NOT EXISTS (SELECT 1 FROM Includes WHERE itinerary_id = itineraryId AND object_id = objectId) THEN
        -- Insert the object into the itinerary
        INSERT INTO Includes (itinerary_id, object_id)
        VALUES (itineraryId, objectId);
    END IF;
    
    -- Return affected rows count
    SELECT ROW_COUNT() AS affected_rows;
END;