CREATE PROCEDURE loadObjectCountries()
BEGIN
    SELECT DISTINCT country
    FROM objects;
END;
