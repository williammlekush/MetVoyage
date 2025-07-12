# Itineraries of objects created by users for a given date
CREATE TABLE IF NOT EXISTS Itineraries (
   id INT AUTO_INCREMENT PRIMARY KEY
   ,owner_id INT NOT NULL REFERENCES Users(id)
   ,date DATE NOT NULL
);