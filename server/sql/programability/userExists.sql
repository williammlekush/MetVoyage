CREATE PROCEDURE userExists(IN userName VARCHAR(255))
BEGIN
    SELECT id
    FROM users
    WHERE user_name = userName;
END;