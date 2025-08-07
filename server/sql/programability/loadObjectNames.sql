CREATE PROCEDURE loadObjectNames()
BEGIN
   SELECT DISTINCT name
   FROM objects
   ORDER BY name;
END;