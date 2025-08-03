CREATE PROCEDURE loadObjectDynasties()
BEGIN
    SELECT DISTINCT dynasty
    FROM objects;
END;
