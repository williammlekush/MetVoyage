CREATE PROCEDURE createItinerary(IN userId INT, IN newDate DATE)
BEGIN
    -- Check if an itinerary already exists for the user on the specified date
    IF NOT EXISTS (SELECT 1 FROM Itineraries WHERE owner_id = userId AND date = newDate) THEN
        INSERT INTO Itineraries (owner_id, date)
        VALUES (userId, newDate);
    END IF;
    
    -- Return new ID
    SELECT id FROM Itineraries
    WHERE owner_id = userId AND date = newDate;
END;