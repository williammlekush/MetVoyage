# Includes relationship between Itineraries and Objects
CREATE TABLE IF NOT EXISTS Includes (
   itinerary_id INT REFERENCES Itineraries(id)
   ,object_id INT REFERENCES Objects(id)
   ,`order` INT NOT NULL
   ,PRIMARY KEY (itinerary_id, object_id)
   ,UNIQUE(itinerary_id, object_id, `order`)
);