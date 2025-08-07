CREATE PROCEDURE loadObjectPeriods()
BEGIN
   SELECT DISTINCT period
   FROM objects
   ORDER BY period;
END;
