import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createDb, runQueryFromFile } from "./query.js";

dotenv.config();

// Create the database if it doesn't exist.
createDb();

// Example table creation.
runQueryFromFile({ queryName: "CreateHello" });

// Example data insertion. TODO: Move to API reply to button.
runQueryFromFile({ queryName: "InsertHello" });

// Example data retrieval. TODO: Move to API reply to button.
runQueryFromFile({
  queryName: "ReadHello",
  resultCallback: (result) => console.log(result),
});

const APP = express();
APP.use(cors());
APP.use(express.json());

const PORT = process.env.PORT || 5000;
APP.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
