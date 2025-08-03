CREATE PROCEDURE loadObjectReigns()
BEGIN
    SELECT DISTINCT reign
    FROM objects;
END;
