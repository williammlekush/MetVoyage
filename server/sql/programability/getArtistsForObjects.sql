CREATE PROCEDURE getArtistsForObjects(IN objectIds VARCHAR(16383))
BEGIN
   SET @query_sql = CONCAT(
      'SELECT DISTINCT',
      ' objects.id',
      ' ,JSON_ARRAYAGG(JSON_OBJECT(',
      '   \'id\', artists.id',
      '   ,\'prefix\', created.artist_prefix',
      '   ,\'name\', artists.name',
      '   ,\'nationality\', artists.nationality',
      '   ,\'begin\', artists.begin_date',
      '   ,\'end\', artists.end_date',
      ')) AS artists ',
      'FROM objects ',
      'LEFT JOIN created'
      ' ON objects.id = created.object_id ',
      'LEFT JOIN artists'
      ' ON created.artist_id = artists.id ',
      'WHERE objects.id IN (', objectIds, ') ',
      'GROUP BY objects.id'
   );
   PREPARE stmt FROM @query_sql;
   EXECUTE stmt;
   DEALLOCATE PREPARE stmt;
END;