CREATE PROCEDURE loadObjectCities()
BEGIN
   SELECT DISTINCT city
   FROM objects
   ORDER BY city;
END;
