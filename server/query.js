import fs from "fs";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const DB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const query = ({ query, resultCallback }) => {
  DB.query(query, (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return;
    }
    resultCallback && resultCallback(result);
  });
};

export const createDb = () =>
  DB.connect((connectError) => {
    if (connectError) {
      console.error("Error connecting to the database:", connectError);
      return;
    }
    query({ query: `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}` });
  });

const queryDB = (queryCallback) => {
  query({ query: `USE ${process.env.DB_NAME}` });
  queryCallback();
};

export const runQueryFromFile = ({ queryName, resultCallback }) => {
  fs.readFile(`./sql/${queryName}.sql`, "utf8", (error, sql) => {
    if (error) {
      console.error("Error reading SQL file:", error);
      return;
    }
    queryDB(() => query({ query: sql, resultCallback }));
  });
};
