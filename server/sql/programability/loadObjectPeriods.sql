CREATE PROCEDURE loadObjectPeriods()
BEGIN
    SELECT DISTINCT period
    FROM objects;
END;
