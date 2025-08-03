import express from "express";
import { runStoredProcedure } from "../query.js";
import { cacheGuard, setCache } from "../cache.js";
import { pendingGuard } from "../pending.js";

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

const cacheableDistinctEndpoints = [
  {
    path: "/read/distinctNames",
    key: "objectNames",
    procedure: "loadObjectNames",
    notFound: "No names found.",
  },
  {
    path: "/read/distinctTitles",
    key: "objectTitles",
    procedure: "loadObjectTitles",
    notFound: "No titles found.",
  },
  {
    path: "/read/distinctMedia",
    key: "objectMedia",
    procedure: "loadObjectMedia",
    notFound: "No media found.",
  },
  {
    path: "/read/distinctClassifications",
    key: "objectClassifications",
    procedure: "loadObjectClassifications",
    notFound: "No classifications found.",
  },
  {
    path: "/read/distinctDepartments",
    key: "objectDepartments",
    procedure: "loadObjectDepartments",
    notFound: "No departments found.",
  },
  {
    path: "/read/distinctCities",
    key: "objectCities",
    procedure: "loadObjectCities",
    notFound: "No cities found.",
  },
  {
    path: "/read/distinctCountries",
    key: "objectCountries",
    procedure: "loadObjectCountries",
    notFound: "No countries found.",
  },
  {
    path: "/read/distinctRegions",
    key: "objectRegions",
    procedure: "loadObjectRegions",
    notFound: "No regions found.",
  },
  {
    path: "/read/distinctCultures",
    key: "objectCultures",
    procedure: "loadObjectCultures",
    notFound: "No cultures found.",
  },
  {
    path: "/read/distinctPeriods",
    key: "objectPeriods",
    procedure: "loadObjectPeriods",
    notFound: "No periods found.",
  },
  {
    path: "/read/distinctDynasties",
    key: "objectDynasties",
    procedure: "loadObjectDynasties",
    notFound: "No dynasties found.",
  },
  {
    path: "/read/distinctReigns",
    key: "objectReigns",
    procedure: "loadObjectReigns",
    notFound: "No reigns found.",
  },
];

cacheableDistinctEndpoints.forEach(({ path, key, procedure, notFound }) => {
  ROUTER.get(path, (_request, response) => {
    pendingGuard(
      key,
      () =>
        new Promise((resolve, reject) => {
          const cachedData = cacheGuard(key, () =>
            runStoredProcedure({
              procedure,
              parameters: [],
              resultCallback: (result) => {
                const data = result[0];
                if (data?.length > 0) {
                  setCache(key, data);
                  response.status(200).json(data);
                  resolve();
                } else {
                  response.status(404).json(notFound);
                  resolve();
                }
              },
            })
          );
          if (cachedData?.length > 0) {
            response.status(200).json(cachedData);
          }
          resolve();
        })
    );
  });
});
//#endregion

export default ROUTER;
