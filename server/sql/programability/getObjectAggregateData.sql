CREATE PROCEDURE getObjectAggregateData(IN objectId INT)
BEGIN
    SELECT COUNT(Users.id) AS favorite_count,
           COUNT(DISTINCT Itineraries.owner_id) AS itinerary_count
    FROM objects
    LEFT JOIN Users ON objects.id = Users.favorite_obj_id
    LEFT JOIN Includes ON objects.id = Includes.object_id
    LEFT JOIN Itineraries ON Includes.itinerary_id = Itineraries.id
    WHERE objects.id = objectId;
END;