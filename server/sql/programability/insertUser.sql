-- Active: 1751729541379@@127.0.0.1@3306@metvoyage
CREATE PROCEDURE insertUser(IN userName VARCHAR(255), IN passWord VARCHAR(255))
BEGIN
   INSERT IGNORE INTO users (user_name, password)
   VALUES (userName, passWord);
END;