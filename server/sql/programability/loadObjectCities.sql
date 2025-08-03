CREATE PROCEDURE loadObjectCities()
BEGIN
    SELECT DISTINCT city
    FROM objects;
END;
