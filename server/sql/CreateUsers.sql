# Users with a favorite object
CREATE TABLE IF NOT EXISTS Users (
   id INT AUTO_INCREMENT PRIMARY KEY
   ,user_name NVARCHAR(255) NOT NULL UNIQUE
   ,display_name NVARCHAR(255) DEFAULT 'Display name!'
   ,password NVARCHAR(255) NOT NULL
   ,favorite_obj_id INT NULL REFERENCES Objects(id)
);
