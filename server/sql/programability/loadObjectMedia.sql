CREATE PROCEDURE loadObjectMedia()
BEGIN
   SELECT DISTINCT medium
   FROM objects
   ORDER BY medium;
END;
