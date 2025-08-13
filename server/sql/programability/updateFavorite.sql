CREATE PROCEDURE updateFavorite(IN userId INT, IN favoriteId INT)
BEGIN
    -- Update the favorite_obj_id for the specified user
    UPDATE Users 
    SET favorite_obj_id = favoriteId
    WHERE id = userId;
    
    -- Optional: Return affected rows count
    SELECT ROW_COUNT() AS affected_rows;
    SELECT `url` FROM Images WHERE object_id = favoriteId LIMIT 1;
END;