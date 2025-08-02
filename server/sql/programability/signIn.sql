CREATE PROCEDURE signIn(IN userName VARCHAR(255), IN passWord VARCHAR(255))
BEGIN
    SELECT
      users.id
      ,display_name
      ,images.url
    FROM users
    LEFT JOIN images
      ON users.favorite_obj_id = images.object_id
    WHERE user_name = userName
    AND users.password = passWord
    LIMIT 1;
END;