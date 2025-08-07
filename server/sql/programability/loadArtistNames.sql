CREATE PROCEDURE loadArtistNames()
BEGIN
   SELECT DISTINCT name
   FROM artists
   ORDER BY name;
END;