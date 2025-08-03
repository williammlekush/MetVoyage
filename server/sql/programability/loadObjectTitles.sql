CREATE PROCEDURE loadObjectTitles()
BEGIN
    SELECT DISTINCT title
    FROM objects;
END;
