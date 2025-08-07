CREATE PROCEDURE loadObjectClassifications()
BEGIN
   SELECT DISTINCT classification
   FROM objects
   ORDER BY classification;
END;
