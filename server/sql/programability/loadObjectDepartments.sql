CREATE PROCEDURE loadObjectDepartments()
BEGIN
   SELECT DISTINCT department
   FROM objects
   ORDER BY department;
END;
