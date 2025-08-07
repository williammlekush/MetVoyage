CREATE PROCEDURE loadObjectCountries()
BEGIN
   SELECT DISTINCT country
   FROM objects
   ORDER BY country;
END;
