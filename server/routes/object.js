import express from "express";
import { runStoredProcedure } from "../query.js";
import { cacheGuard, getCache, setCache } from "../cache.js";
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
    parameters: [_request.query.id.toString()],
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
        new Promise((resolve, _reject) => {
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

const getFilterObjectsParam = (filterKey, query) => query[filterKey] || -2;

ROUTER.get("/read/filteredObjects", (request, response) => {
  const artist = getFilterObjectsParam("artist", request.query);
  const title = getFilterObjectsParam("title", request.query);
  const medium = getFilterObjectsParam("medium", request.query);
  const name = getFilterObjectsParam("name", request.query);
  const classification = getFilterObjectsParam("classification", request.query);
  const department = getFilterObjectsParam("department", request.query);
  const period = getFilterObjectsParam("period", request.query);
  const dynasty = getFilterObjectsParam("dynasty", request.query);
  const reign = getFilterObjectsParam("reign", request.query);
  const city = getFilterObjectsParam("city", request.query);
  const country = getFilterObjectsParam("country", request.query);
  const region = getFilterObjectsParam("region", request.query);
  const culture = getFilterObjectsParam("culture", request.query);

  const defaultLimitOffset = 0;
  const defaultLimitCount = 21;

  const resetCache = request.query.resetCache === "true";

  const limitOffsetCacheKey = "limitOffset";

  setCache(
    limitOffsetCacheKey,
    resetCache
      ? defaultLimitOffset
      : defaultLimitCount + getCache(limitOffsetCacheKey)
  );

  const searchCacheKey = "search";

  pendingGuard(
    "searchObjects",
    () =>
      new Promise((resolve, _reject) => {
        runStoredProcedure({
          procedure: "searchObjects",
          parameters: [
            title,
            artist,
            medium,
            name,
            classification,
            department,
            period,
            dynasty,
            reign,
            city,
            country,
            region,
            culture,
            getCache(limitOffsetCacheKey),
            defaultLimitCount,
          ],
          resultCallback: (result) => {
            const data = result[0];
            if (data) {
              const params = data.map(({ id }) => id).join(",");
              runStoredProcedure({
                procedure: "getObjectAggregateData",
                parameters: [params],
                resultCallback: (aggResult) => {
                  const aggData = aggResult[0];
                  if (aggData) {
                    runStoredProcedure({
                      procedure: "getImagesForObjects",
                      parameters: [params],
                      resultCallback: (imgsResult) => {
                        const imgsData = imgsResult[0];
                        if (imgsData) {
                          runStoredProcedure({
                            procedure: "getArtistsForObjects",
                            parameters: [params],
                            resultCallback: (artistsResult) => {
                              const artistsData = artistsResult[0];
                              if (artistsData) {
                                let responseData = data.map((obj) => ({
                                  ...obj,
                                  ...(aggData.find(
                                    (aggregateData) =>
                                      aggregateData.id === obj.id
                                  ) || {}),
                                  images:
                                    imgsData.find(
                                      (imgData) => imgData.id === obj.id
                                    ).images || [],
                                  artists:
                                    artistsData.find(
                                      (artistData) => artistData.id === obj.id
                                    ).artists || [],
                                }));

                                if (!resetCache) {
                                  const cachedSearchData =
                                    getCache(searchCacheKey);
                                  if (cachedSearchData) {
                                    responseData = [
                                      ...cachedSearchData,
                                      ...responseData,
                                    ];
                                  }
                                }

                                setCache(searchCacheKey, responseData);
                                response.status(200).json(responseData);
                                resolve();
                              } else {
                                response.status(404).json("No artists found.");
                                resolve();
                              }
                            },
                          });
                        } else {
                          response.status(404).json("No images found.");
                          resolve();
                        }
                      },
                    });
                  } else {
                    response.status(404).json("Search returned no data.");
                    resolve();
                  }
                },
              });
              resolve();
            } else {
              response.status(404).json("Search returned no data.");
              resolve();
            }
          },
        });
        resolve();
      })
  );
});

export default ROUTER;
