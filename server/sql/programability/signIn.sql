CREATE PROCEDURE signIn(IN userName VARCHAR(255), IN passWord VARCHAR(255))
BEGIN
    SELECT
      users.id
      ,display_name
      ,favorite_obj_id
    FROM users
    LEFT JOIN objects
      ON users.favorite_obj_id = objects.id
    WHERE user_name = userName
    AND users.password = passWord
    LIMIT 1;
END;