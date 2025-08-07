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

ROUTER.post("/share", (request, response) => {
  runStoredProcedure({
    procedure: "shareItinerary",
    parameters: [request.body.itineraryId, request.body.userId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.post("/unshare", (request, response) => {
  runStoredProcedure({
    procedure: "unShareItinerary",
    parameters: [request.body.itineraryId, request.body.userId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.get("/read/forUser", (request, response) => {
  runStoredProcedure({
    procedure: "getItinerariesForUser",
    parameters: [request.query.userId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.get("/read", (request, response) => {
  runStoredProcedure({
    procedure: "getItineraryById",
    parameters: [request.query.id, request.query.userId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.get("/read/objects", (request, response) => {
  runStoredProcedure({
    procedure: "getObjectsForItinerary",
    parameters: [request.query.itineraryId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.get("/read/users", (request, response) => {
  runStoredProcedure({
    procedure: "getUsersForItinerary",
    parameters: [request.query.itineraryId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.get("/read/userOptions", (request, response) => {
  runStoredProcedure({
    procedure: "loadUserOptions",
    parameters: [],
    resultCallback: (result) => response.status(200).json(result),
  });
});

export default ROUTER;