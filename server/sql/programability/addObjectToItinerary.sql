CREATE PROCEDURE addObjectToItinerary(IN objectId INT, IN itineraryId INT)
BEGIN
    DECLARE newOrder INT;
    -- Check if the object is already included in the itinerary
    IF NOT EXISTS (SELECT 1 FROM Includes WHERE itinerary_id = itineraryId AND object_id = objectId) THEN
        -- Always set order to the last order + 1
        SET newOrder = (SELECT COALESCE(MAX(`order`), 0) + 1 FROM Includes WHERE itinerary_id = itineraryId);

        -- Insert the object into the itinerary
        INSERT INTO Includes (itinerary_id, object_id, `order`)
        VALUES (itineraryId, objectId, newOrder);
    END IF;
    
    -- Return affected rows count
    SELECT ROW_COUNT() AS affected_rows;
END;