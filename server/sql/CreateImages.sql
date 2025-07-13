# Images of gallery objects
CREATE TABLE IF NOT EXISTS Images (
   id int AUTO_INCREMENT PRIMARY KEY
   ,url NVARCHAR(180)
   ,object_id INT NOT NULL REFERENCES Objects(id)
   ,public_caption NVARCHAR(1080) NULL
   ,caption NVARCHAR(70) NULL
);