CREATE PROCEDURE loadObjectNames()
BEGIN
    SELECT DISTINCT name
    FROM objects;
END;