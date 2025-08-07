CREATE PROCEDURE loadObjectTitles()
BEGIN
   SELECT DISTINCT title
   FROM objects
   ORDER BY title;
END;
