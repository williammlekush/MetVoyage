import fs from "fs";
import mysql from "mysql2";
import dotenv from "dotenv";
import {
  artistMap,
  imagesMap,
  objectMap,
  parseMetImages,
  parseMetObjects,
} from "./parse.js";

dotenv.config();

//#region db connection
export const DB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const connect = () => {
  DB.connect((connectError) => {
    if (connectError) {
      console.error("Error connecting to the database:", connectError);
      return;
    }
  });
};
//#endregion

//#region query helpers
export const query = ({ query, values, resultCallback }) => {
  DB.query(query, [values], (error, result) => {
    if (error) {
      console.error("Error executing query:", error, "Query:" + query);
      return;
    }
    resultCallback && resultCallback(result);
  });
};

const queryDb = (queryCallback) => {
  query({ query: `USE ${process.env.DB_NAME}` });
  queryCallback();
};

export const runQueryFromFile = ({ queryName, resultCallback }) => {
  fs.readFile(`./sql/${queryName}.sql`, "utf8", (error, sql) => {
    if (error) {
      console.error("Error reading SQL file:", error);
      return;
    }
    queryDb(() => query({ query: sql, resultCallback }));
  });
};

const insertObjects = (table, columns, objects) =>
  new Promise((resolve, _reject) => {
    const sql = `INSERT INTO ${table} (${columns.join(", ")}) VALUES ?;`;
    const values = objects.map((object) => {
      const value = [];
      columns.forEach((column) => value.push(object[column]));
      return value;
    });
    queryDb(() =>
      query({ query: sql, values: values, resultCallback: resolve })
    );
  });

const insertObjectsInBatches = async (
  table,
  columns,
  objects,
  batchSize = 100
) => {
  for (let i = 0; i < objects.length; i += batchSize) {
    const batch = objects.slice(i, Math.min(i + batchSize, objects.length));
    await insertObjects(table, columns, batch);
  }
};
//#endregion

//#region queries

// These are roughy ordered according to dependencies.
const Table = Object.freeze({
  OBJECTS: "Objects",
  IMAGES: "Images",
  USERS: "Users",
  ITINERARIES: "Itineraries",
  INCLUDES: "Includes",
  CANVIEW: "CanView",
  ARTISTS: "Artists",
  CREATED: "Created",
});

const createDb = () =>
  queryDb(() =>
    query({ query: `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}` })
  );

const createTables = () =>
  Object.values(Table).forEach((table) =>
    runQueryFromFile({ queryName: `Create${table}` })
  );

const dropTables = () => {
  // Disable foreign key checks to delete all tables
  queryDb(() => query({ query: "SET FOREIGN_KEY_CHECKS = 0" }));
  Object.values(Table).forEach((table) =>
    queryDb(() => query({ query: "DROP TABLE IF EXISTS " + table }))
  );
  // Re-enable foreign key checks
  queryDb(() => query({ query: "SET FOREIGN_KEY_CHECKS = 1" }));
};

const insertMetData = async () => {
  console.log("Step 1/5: Parsing object data into objects and artists...");
  const { objects, artists } = await parseMetObjects();
  // iterate over each batch of 100 objec and insert them

  console.log("Step 2/5: Inserting objects into dbo.MetVoyage.Objects...");
  await insertObjectsInBatches(
    Table.OBJECTS,
    Object.values(objectMap),
    objects
  );

  console.log("Step 3/5: Inserting artists into dbo.MetVoyage.Artists...");
  await insertObjectsInBatches(
    Table.ARTISTS,
    Object.values(artistMap),
    artists
  );

  console.log("Step 4/5: Parsing image data into images...");
  const images = await parseMetImages();

  console.log("Step 5/5: Inserting images into dbo.MetVoyage.Images...");
  await insertObjectsInBatches(Table.IMAGES, Object.values(imagesMap), images);
};

export const buildDb = async (rebuild = true) => {
  console.log("Creating database...");
  createDb();

  if (rebuild) {
    console.log("Dropping tables...");
    dropTables();
  }

  console.log("Creating tables...");
  createTables();

  // Insert Met data
  console.log("Starting data retrieval and insert...");
  await insertMetData();

  console.log("Database built successfully!");
};
//#endregion
