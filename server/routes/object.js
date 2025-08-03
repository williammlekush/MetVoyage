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
    parameters: [_request.body.objectId, _request.body.itineraryId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

//#region read distinct col
ROUTER.get("/read/distinctNames", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectNames",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No names found.");
    },
  })
);

ROUTER.get("/read/distinctTitles", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectTitles",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No titles found.");
    },
  })
);

ROUTER.get("/read/distinctMedia", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectMedia",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No media found.");
    },
  })
);

ROUTER.get("/read/distinctClassifications", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectClassifications",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No classifications found.");
    },
  })
);

ROUTER.get("/read/distinctDepartments", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectDepartments",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No departments found.");
    },
  })
);

ROUTER.get("/read/distinctCities", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectCities",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No cities found.");
    },
  })
);

ROUTER.get("/read/distinctCountries", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectCountries",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No countries found.");
    },
  })
);

ROUTER.get("/read/distinctRegions", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectRegions",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No regions found.");
    },
  })
);

ROUTER.get("/read/distinctCultures", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectCultures",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No cultures found.");
    },
  })
);

ROUTER.get("/read/distinctPeriods", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectPeriods",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No periods found.");
    },
  })
);

ROUTER.get("/read/distinctDynasties", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectDynasties",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No dynasties found.");
    },
  })
);

ROUTER.get("/read/distinctReigns", (_request, response) =>
  runStoredProcedure({
    procedure: "loadObjectReigns",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No reigns found.");
    },
  })
);
//#endregion

export default ROUTER;
