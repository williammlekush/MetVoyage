# Can view relationship between Itineraries and Users
CREATE TABLE IF NOT EXISTS Can_View (
   user_id INT REFERENCES Users(id)
   ,object_id INT REFERENCES Objects(id)
   ,PRIMARY KEY (user_id, object_id)
);