CREATE PROCEDURE signIn(IN userName VARCHAR(255), IN passWord VARCHAR(255))
BEGIN
    SELECT 
      id
      ,display_name
      ,favorite_obj_id
    FROM users
    JOIN objects
      ON users.favorite_obj_id = objects.id
    WHERE user_name = userName
    AND users.password = passWord;
END;