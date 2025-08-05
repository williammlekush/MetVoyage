import fs from "fs";
import path from "path";
import mysql from "mysql2";
import dotenv from "dotenv";
import {
  artistMap,
  createdMap,
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

const queryDbAsync = async (queryCallback) => {
  return new Promise((resolve, reject) => {
    try {
      query({ query: `USE ${process.env.DB_NAME}` });
      queryCallback(); // Execute the callback
      resolve(); // Resolve the Promise when the callback finishes
    } catch (error) {
      reject(error); // Reject the Promise if an error occurs
    }
  });
};

export const runStoredProcedure = ({
  procedure,
  parameters,
  resultCallback,
  paramsAreValues = true,
}) => {
  const sql = `CALL ${procedure}(${parameters
    .map((parameter) => {
      if (paramsAreValues) {
        const type = typeof parameter;
        if (type === "string") return `'${parameter}'`;
        if (type === "boolean") return parameter ? 1 : 0;
      }
      return parameter;
    })
    .join(", ")});`;
  queryDb(() => query({ query: sql, resultCallback }));
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

export const runQueryFromFileAsync = async ({ queryName, resultCallback }) => {
  try {
    // Read the SQL file asynchronously
    const sql = await fs.promises.readFile(`./sql/${queryName}.sql`, "utf8");

    // Execute the query
    const result = await queryDbAsync(() =>
      query({ query: sql, resultCallback })
    );

    return result;
  } catch (error) {
    console.error("Error executing query from file:", error);
    throw error;
  }
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

const createTables = async () => {
  for (const table of Object.values(Table)) {
    await runQueryFromFileAsync({ queryName: `Create${table}` });
  }
};

const createStoredProcedures = () => {
  const files = fs.readdirSync("./sql/programability");

  if (files.length) {
    for (const file of files) {
      runQueryFromFile({
        queryName: `programability/${path.parse(file).name}`,
      });
    }
  }
};

const dropTables = () => {
  // Disable foreign key checks to delete all tables
  queryDb(() => query({ query: "SET FOREIGN_KEY_CHECKS = 0" }));
  Object.values(Table).forEach((table) =>
    queryDb(() => query({ query: "DROP TABLE IF EXISTS " + table }))
  );
  // Re-enable foreign key checks
  queryDb(() => query({ query: "SET FOREIGN_KEY_CHECKS = 1" }));
};

const dropStoredProcedures = () => {
  const files = fs.readdirSync("./sql/programability");

  if (files.length) {
    files.map((file) => {
      const fileName = path.parse(file).name; //remove extension
      queryDb(() => query({ query: `DROP PROCEDURE IF EXISTS ${fileName};` }));
    });
  }
};

const insertMetData = async () => {
  console.log("Step 1/6: Parsing object data into objects and artists...");
  const { objects, artists, created } = await parseMetObjects();
  // iterate over each batch of 100 objects and insert them

  console.log("Step 2/6: Inserting objects into dbo.MetVoyage.Objects...");
  await insertObjectsInBatches(
    Table.OBJECTS,
    Object.values(objectMap),
    objects
  );

  console.log("Step 3/6: Inserting artists into dbo.MetVoyage.Artists...");
  await insertObjectsInBatches(
    Table.ARTISTS,
    Object.values(artistMap),
    artists
  );

  console.log("Step 4/6: Inserting created data into dbo.MetVoyage.Created...");
  await insertObjectsInBatches(
    Table.CREATED,
    Object.values({ artist_id: "artist_id", ...createdMap }),
    created
  );

  console.log("Step 5/6: Parsing image data into images...");
  const images = await parseMetImages();

  console.log("Step 6/6: Inserting images into dbo.MetVoyage.Images...");
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

export const buildStoredProcedures = (rebuild = true) => {
  if (rebuild) {
    console.log("Dropping stored procedures");
    dropStoredProcedures();
  }

  console.log("Creating stored procedures...");
  createStoredProcedures();
};
//#endregion
