CREATE PROCEDURE getObjectAggregateData(IN objectIds VARCHAR(16383))
BEGIN
   SET @query_sql = CONCAT(
      'SELECT'
      ' objects.id',
      ' ,COUNT(Users.id) AS favorite_count'
      ' ,COUNT(DISTINCT Itineraries.owner_id) AS itinerary_count ',
      'FROM objects ',
      'LEFT JOIN Users'
      ' ON objects.id = Users.favorite_obj_id ',
      'LEFT JOIN Includes'
      ' ON objects.id = Includes.object_id ',
      'LEFT JOIN Itineraries'
      ' ON Includes.itinerary_id = Itineraries.id ',
      'WHERE objects.id IN (', objectIds, ') ',
      'GROUP BY objects.id'
   );
   PREPARE stmt FROM @query_sql;
   EXECUTE stmt;
   DEALLOCATE PREPARE stmt;
END;