CREATE PROCEDURE updateUserDisplayName(IN userId INT, IN name VARCHAR(255))
BEGIN
    UPDATE Users 
    SET display_name = name
    WHERE id = userId;
END;