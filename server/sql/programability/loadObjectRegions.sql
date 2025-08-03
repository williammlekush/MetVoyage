CREATE PROCEDURE loadObjectRegions()
BEGIN
    SELECT DISTINCT region
    FROM objects;
END;
