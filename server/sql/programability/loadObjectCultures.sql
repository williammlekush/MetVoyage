CREATE PROCEDURE loadObjectCultures()
BEGIN
    SELECT DISTINCT culture
    FROM objects;
END;
