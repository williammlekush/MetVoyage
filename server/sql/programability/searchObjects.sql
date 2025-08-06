CREATE PROCEDURE searchObjects(
   IN title VARCHAR(16383),
   IN artist VARCHAR(16383),
   IN medium VARCHAR(16383),
   IN name VARCHAR(16383),
   IN classification VARCHAR(16383),
   IN department VARCHAR(16383),
   IN period VARCHAR(16383),
   IN dynasty VARCHAR(16383),
   IN reign VARCHAR(16383),
   IN city VARCHAR(16383),
   IN country VARCHAR(16383),
   IN region VARCHAR(16383),
   IN culture VARCHAR(16383)
)
BEGIN
   SELECT objects.id
      ,objects.title
      ,objects.medium
      ,objects.name
      ,objects.classification
      ,objects.department
      ,objects.period
      ,objects.dynasty
      ,objects.reign
      ,objects.city
      ,objects.country
      ,objects.region
      ,objects.culture
      ,created.artist_id
      ,artists.id AS artist_id
      ,artists.name AS artist_name
      ,artists.nationality AS artist_nationality
      ,artists.begin_date AS artist_begin_date
      ,artists.end_date AS artist_end_date
      ,created.artist_prefix
      ,images.url 
      ,images.public_caption
   FROM objects
   JOIN created 
      ON objects.id = created.object_id
   JOIN artists
      ON created.artist_id = artists.id
   LEFT JOIN images
      ON images.object_id = objects.id
   WHERE (artist = -2 
      OR artists.name = artist
   ) AND ( title = -2  
      OR objects.title = title
   ) AND ( medium = -2 
      OR objects.medium = medium
   ) AND ( name = -2 
      OR objects.name = name
   ) AND ( classification = -2 
      OR objects.classification = classification
   ) AND ( department = -2 
      OR objects.department = department
   ) AND ( period = -2 
      OR objects.period = period
   ) AND ( dynasty = -2 
      OR objects.dynasty = dynasty
   ) AND ( reign = -2 
      OR objects.reign = reign
   ) AND ( city = -2 
      OR objects.city = city
   ) AND ( country = -2 
      OR objects.country = country
   ) AND ( region = -2 
      OR objects.region = region
   ) AND ( culture = -2 
      OR objects.culture = culture
   ) LIMIT 20;
END;