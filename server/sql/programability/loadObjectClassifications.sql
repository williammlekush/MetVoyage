CREATE PROCEDURE loadObjectClassifications()
BEGIN
    SELECT DISTINCT classification
    FROM objects;
END;
