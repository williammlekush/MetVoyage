CREATE PROCEDURE loadObjectRegions()
BEGIN
   SELECT DISTINCT region
   FROM objects
   ORDER BY region;
END;
