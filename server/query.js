import fs from "fs";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

//#region db connection
export const DB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

//#endregion

//#region query helpers
export const query = ({ query, resultCallback }) => {
  DB.query(query, (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      return;
    }
    resultCallback && resultCallback(result);
  });
};

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

const insertObjects = (table = "", columns = [], objects = []) => {
  const sql = `INSERT INTO ${table} (${columns.join(", ")}) VALUES ?`;
  queryDB(() => qu}))
};

//#endregion

//#region queries

// These are roughy ordered according to dependencies.
const tables = [
  "Objects",
  "Images",
  "Users",
  "Itineraries",
  "Includes",
  "CanView",
  "Artists",
  "Created",
];

export const createDb = () =>
  DB.connect((connectError) => {
    if (connectError) {
      console.error("Error connecting to the database:", connectError);
      return;
    }
    query({ query: `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}` });
  });

export const createTables = () => {
  tables.forEach((table) => runQueryFromFile({ queryName: `Create${table}` }));
};

export const dropTables = () => {
  tables.forEach((table) =>
    queryDB(() => query({ query: "DROP TABLE IF EXISTS " + table }))
  );
};
