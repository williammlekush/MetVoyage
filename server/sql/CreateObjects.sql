# Objects visitable in the gallery
CREATE TABLE IF NOT EXISTS Objects (
   # Identiy
   id INT PRIMARY KEY
   ,number VARCHAR(50) NOT NULL
   ,name NVARCHAR(80) NULL
   ,title NVARCHAR(830) NULL
   ,link_resource NVARCHAR(60) UNIQUE
   ,is_highlight BOOLEAN NOT NULL
   ,credit_line NVARCHAR(620) NULL
   # Ethnography
   ,culture NVARCHAR(70) NOT NULL
   ,period NVARCHAR(80) NULL
   ,dynasty NVARCHAR(50) NULL
   ,reign NVARCHAR(60) NULL
   ,date NVARCHAR(110) NULL
   ,begin_date INT NOT NULL
   ,end_date INT NOT NULL
   # Geography
   ,geography_type NVARCHAR(80) NULL
   ,city NVARCHAR(50) NULL
   ,state NVARCHAR(50) NULL
   ,county NVARCHAR(40) NULL
   ,country NVARCHAR(70) NULL
   ,region NVARCHAR(50) NULL 
   ,subregion NVARCHAR(50) NULL
   ,locale NVARCHAR(70) NULL
   ,locus NVARCHAR(50) NULL
   ,excavation NVARCHAR(100) NULL
   ,river NVARCHAR(30) NULL
   # Measurement
   ,classification NVARCHAR(80) NULL
   ,medium NVARCHAR(8200) NULL
   ,dimensions NVARCHAR(1900) NULL
   # Residence
   ,rights_and_reproductions NVARCHAR(160) NULL
   ,department NVARCHAR(50) NULL
   ,portfolio NVARCHAR(430) NOT NULL
);