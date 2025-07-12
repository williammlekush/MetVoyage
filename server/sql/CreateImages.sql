# Images of gallery objects
CREATE TABLE IF NOT EXISTS Images (
   id INT PRIMARY KEY
   ,url NVARCHAR(2000)
   ,object_id INT NOT NULL REFERENCES Objects(id)
   ,public_caption NVARCHAR(255) NULL
   ,caption NVARCHAR(255) NULL
);