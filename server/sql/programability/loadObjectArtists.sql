CREATE PROCEDURE loadObjectArtists(IN objectId INT)
BEGIN
    SELECT *
    FROM created
    LEFT JOIN artists
        ON created.artist_id = artists.id
    WHERE created.object_id = objectId;
END;