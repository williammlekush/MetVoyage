CREATE PROCEDURE loadObjectMedia()
BEGIN
    SELECT DISTINCT medium
    FROM objects;
END;
