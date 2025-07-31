CREATE PROCEDURE signIn(IN userName VARCHAR(255), IN passWord VARCHAR(255))
BEGIN
    SELECT id
    FROM users
    WHERE user_name = userName
    AND users.password = passWord;
END;