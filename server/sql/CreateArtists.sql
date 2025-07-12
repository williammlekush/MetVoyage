# Artists who create gallery objects
CREATE TABLE IF NOT EXISTS Artists (
   id INT AUTO_INCREMENT PRIMARY KEY
   ,name NVARCHAR(255) NULL
   ,suffix NVARCHAR(255) NULL
   ,nationality NVARCHAR(255) NULL
   ,begin_date NVARCHAR(100) NULL
   ,end_date NVARCHAR(100) NULL
);