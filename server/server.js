import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import HELLO from "./routes/hello.js";
import OBJECT from "./routes/object.js";
import { buildDb, buildStoredProcedures, connect } from "./query.js";

dotenv.config();

connect();

//await buildDb(); // Comment out to avoid re-building the database every time
buildStoredProcedures(); // Comment out to avoid re-building stored procedures every time

// // Example data retrieval.
// runQueryFromFile({
//   queryName: "ReadHello",
//   resultCallback: (result) => console.log(result),
// });

const APP = express();
APP.use(cors());
APP.use(express.json());

APP.use("/api/hello", HELLO);
APP.use("/api/object", OBJECT);

const PORT = process.env.PORT || 5000;
APP.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
