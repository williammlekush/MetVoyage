# Objects visitable in the gallery
CREATE TABLE IF NOT EXISTS Objects (
   # Identiy
   id INT PRIMARY KEY
   ,number VARCHAR(255) NOT NULL UNIQUE
   ,name NVARCHAR(255) NULL
   ,title NVARCHAR(255) NULL
   ,link_resource NVARCHAR(2000)
   ,is_highlight BOOLEAN NOT NULL
   # Ethnography
   ,culture NVARCHAR(255) NOT NULL
   ,period NVARCHAR(255) NULL
   ,dynasty NVARCHAR(255) NULL
   ,reign NVARCHAR(255) NULL
   ,date NVARCHAR(255) NULL
   ,begin_date INT NOT NULL
   ,end_date INT NOT NULL
   # Artist
   ,artist_role NVARCHAR(255) NULL
   ,artist_prefix NVARCHAR(255) NULL
   ,credit_line NVARCHAR(255) NULL
   # Geography
   ,geography_type NVARCHAR(255) NULL
   ,city NVARCHAR(255) NULL
   ,state NVARCHAR(255) NULL
   ,county NVARCHAR(255) NULL
   ,country NVARCHAR(255) NULL
   ,region NVARCHAR(255) NULL 
   ,subregion NVARCHAR(255) NULL
   ,locale NVARCHAR(255) NULL
   ,locus NVARCHAR(255) NULL
   ,excavation NVARCHAR(255) NULL
   ,river NVARCHAR(255) NULL
   # Measurement
   ,classification NVARCHAR(255) NULL
   ,medium NVARCHAR(255) NULL
   ,dimensions NVARCHAR(255) NULL
   # Residence
   ,rights_and_reproductions NVARCHAR(255) NULL
   ,department NVARCHAR(255) NULL
   ,portfolio NVARCHAR(255) NOT NULL
);