CREATE PROCEDURE saveItinerary(IN itineraryId INT, IN objectIds JSON)
BEGIN
    DECLARE orderIndex INT DEFAULT 0;
    DECLARE arrayLength INT DEFAULT JSON_LENGTH(objectIds);

    DELETE FROM Includes WHERE itinerary_id = itineraryId;

    WHILE orderIndex < arrayLength DO
        INSERT INTO Includes (itinerary_id, object_id, `order`)
        VALUES (
            itineraryId,
            JSON_EXTRACT(objectIds, CONCAT('$[', orderIndex, ']')),
            orderIndex + 1
        );
        SET orderIndex = orderIndex + 1;
    END WHILE;
END;