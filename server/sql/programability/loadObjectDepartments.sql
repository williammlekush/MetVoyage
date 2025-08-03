CREATE PROCEDURE loadObjectDepartments()
BEGIN
    SELECT DISTINCT department
    FROM objects;
END;
