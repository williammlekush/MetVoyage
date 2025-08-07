CREATE PROCEDURE loadObjectDynasties()
BEGIN
   SELECT DISTINCT dynasty
   FROM objects
   ORDER BY dynasty;
END;
