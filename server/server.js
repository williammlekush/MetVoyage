import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import HELLO from "./routes/hello.js";
import { createDb, createTables, dropTables } from "./query.js";

dotenv.config();

// Create the database if it doesn't exist.
createDb();

// Build tables from scratch
dropTables();
createTables();

// // Example data insertion.
// runQueryFromFile({ queryName: "InsertHello" });

// // Example data retrieval.
// runQueryFromFile({
//   queryName: "ReadHello",
//   resultCallback: (result) => console.log(result),
// });

const APP = express();
APP.use(cors());
APP.use(express.json());

APP.use("/api/hello", HELLO);

const PORT = process.env.PORT || 5000;
APP.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
