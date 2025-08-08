CREATE PROCEDURE loadUserOptions()
BEGIN
    SELECT id AS userId,
        COALESCE(NULLIF(display_name, ''), user_name) AS userName
    FROM Users;
END;