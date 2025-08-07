CREATE PROCEDURE loadObjectCultures()
BEGIN
   SELECT DISTINCT culture
   FROM objects
   ORDER BY culture;
END;
