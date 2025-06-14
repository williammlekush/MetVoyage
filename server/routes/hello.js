import express from "express";
import { runQueryFromFile } from "../query.js";

const ROUTER = express.Router();

ROUTER.get("/read", (_request, response) => {
  const DATA = runQueryFromFile({
    queryName: "ReadHello",
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.post("/clear", (_request, response) => {
  runQueryFromFile({
    queryName: "ClearHello",
  });
  response.status(200).json({ message: "Hello cleared successfully." });
});

ROUTER.post("/add", (_request, response) => {
  runQueryFromFile({
    queryName: "InsertHello",
  });
  response.status(200).json({ message: "Hello added successfully." });
});

export default ROUTER;
