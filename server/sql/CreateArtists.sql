# Artists who create gallery objects
CREATE TABLE IF NOT EXISTS Artists (
   id INT AUTO_INCREMENT PRIMARY KEY
   ,name NVARCHAR(630) NULL
   ,suffix NVARCHAR(490) NULL
   ,nationality NVARCHAR(280) NULL
   ,begin_date NVARCHAR(280) NULL
   ,end_date NVARCHAR(280) NULL
);