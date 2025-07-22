CREATE PROCEDURE userExists(IN userId INT)
BEGIN
    SELECT id
    FROM users
    WHERE id = userId;
END;