CREATE PROCEDURE loadObjectReigns()
BEGIN
   SELECT DISTINCT reign
   FROM objects
   ORDER BY reign;
END;
