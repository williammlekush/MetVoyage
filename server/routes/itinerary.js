import express from "express";
import { runStoredProcedure } from "../query.js";

const ROUTER = express.Router();

ROUTER.post("/create", (request, response) => {
  runStoredProcedure({
    procedure: "createItinerary",
    parameters: [request.body.userId, request.body.date],
    resultCallback: (result) => response.status(200).json(result),
  });
});

export default ROUTER;