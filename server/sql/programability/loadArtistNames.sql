CREATE PROCEDURE loadArtistNames()
BEGIN
    SELECT DISTINCT name
    FROM artists;
END;