CREATE PROCEDURE getUsersForItinerary(IN itineraryId INT)
BEGIN
    SELECT Users.id AS userId,
        COALESCE(Users.display_name, Users.user_name) AS userName
    FROM Can_View
    LEFT JOIN Users ON Can_View.user_id = Users.id
    WHERE Can_View.itinerary_id = itineraryId;
END;