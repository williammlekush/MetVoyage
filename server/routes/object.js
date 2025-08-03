import express from "express";
import { runStoredProcedure } from "../query.js";

const ROUTER = express.Router();

ROUTER.get("/read", (_request, response) => {
  runStoredProcedure({
    procedure: "loadObject",
    parameters: [_request.query.id],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.get("/read/aggregateData", (_request, response) => {
  runStoredProcedure({
    procedure: "getObjectAggregateData",
    parameters: [_request.query.id],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.get("/read/artist", (_request, response) => {
  runStoredProcedure({
    procedure: "loadObjectArtists",
    parameters: [_request.query.objectId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.get("/read/itineraries", (_request, response) => {
  runStoredProcedure({
    procedure: "getItineraries",
    parameters: [_request.query.userId, _request.query.objectId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.post("/favorite", (_request, response) => {
  runStoredProcedure({
    procedure: "updateFavorite",
    parameters: [_request.body.id, _request.body.objectId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.post("/addToItinerary", (_request, response) => {
  runStoredProcedure({
    procedure: "addObjectToItinerary",
    parameters: [
      _request.body.objectId,
      _request.body.itineraryId,
    ],
    resultCallback: (result) => response.status(200).json(result),
  });
});

export default ROUTER;
