# Can view relationship between Itineraries and Users
CREATE TABLE IF NOT EXISTS Can_View (
   user_id INT REFERENCES Users(id)
   ,itinerary_id INT REFERENCES Itineraries(id)
   ,PRIMARY KEY (user_id, itinerary_id)
);