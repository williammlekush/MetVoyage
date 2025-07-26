CREATE PROCEDURE loadObject(IN objectId INT)
BEGIN
    SELECT *
    FROM objects
    LEFT JOIN images
        ON objects.id = images.object_id
    WHERE objects.id = objectId;
END;