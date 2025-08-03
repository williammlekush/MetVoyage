CREATE PROCEDURE createItinerary(IN userId INT, IN date DATE)
BEGIN
    -- Check if an itinerary already exists for the user on the specified date
    IF NOT EXISTS (SELECT 1 FROM Itineraries WHERE owner_id = userId AND date = date) THEN
        INSERT INTO Itineraries (owner_id, date)
        VALUES (userId, date);
    END IF;
    
    -- Return affected rows count
    SELECT ROW_COUNT() AS affected_rows;
END;