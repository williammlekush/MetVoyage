CREATE PROCEDURE getImagesForObjects(IN objectIds VARCHAR(16383))
BEGIN
   SET @query_sql = CONCAT(
      'SELECT DISTINCT',
      ' objects.id',
      ' ,JSON_ARRAYAGG(JSON_OBJECT(',
      '   \'url\', images.url',
      '   ,\'caption\', images.public_caption',
      ')) AS images ',
      'FROM objects ',
      'LEFT JOIN images'
      ' ON images.object_id = objects.id ',
      'WHERE objects.id IN (', objectIds, ') ',
      'GROUP BY objects.id'
   );
   PREPARE stmt FROM @query_sql;
   EXECUTE stmt;
   DEALLOCATE PREPARE stmt;
END;