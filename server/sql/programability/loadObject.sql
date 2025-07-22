CREATE PROCEDURE loadObject(IN objectId INT)
BEGIN
    SELECT *
    FROM objects
    WHERE id = objectId;
END;