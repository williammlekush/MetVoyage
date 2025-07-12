# Images of gallery objects
CREATE TABLE IF NOT EXISTS Images (
   url NVARCHAR(180) PRIMARY KEY
   ,object_id INT NOT NULL REFERENCES Objects(id)
   ,public_caption NVARCHAR(1080) NULL
   ,caption NVARCHAR(70) NULL
);