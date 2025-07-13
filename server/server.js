import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import HELLO from "./routes/hello.js";
import { buildDb, connect } from "./query.js";

dotenv.config();

connect();

buildDb(); // Note: Comment out to avoid re-building every time

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
