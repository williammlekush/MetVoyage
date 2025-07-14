# Created relationship between artists and gallery objects
CREATE TABLE IF NOT EXISTS Created (
   artist_id INT REFERENCES Artists(id)
   ,artist_role NVARCHAR(330) NULL
   ,artist_prefix NVARCHAR(460) NULL
   ,object_id INT REFERENCES Objects(id)
   ,PRIMARY KEY (artist_id, object_id)
);