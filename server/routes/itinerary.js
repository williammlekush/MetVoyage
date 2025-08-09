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

ROUTER.get("/read/users", (request, response) => {
  runStoredProcedure({
    procedure: "getUsersForItinerary",
    parameters: [request.query.itineraryId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.post("/clear", (request, response) => {
  runStoredProcedure({
    procedure: "clearItinerary",
    parameters: [request.body.itineraryId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.post("/delete", (request, response) => {
  runStoredProcedure({
    procedure: "deleteItinerary",
    parameters: [request.body.itineraryId],
    resultCallback: (result) => response.status(200).json(result),
  });
});

ROUTER.get("/read/objects", (request, response) => {
  runStoredProcedure({
    procedure: "getObjectsForItinerary",
    parameters: [request.query.itineraryId],
    resultCallback: (result) => {
      const data = result[0];
      if (data.length > 0) {
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
                          response.status(200).json(responseData);
                        } else {
                          response.status(404).json("No artists found.");
                        }
                      },
                    });
                  } else {
                    response.status(404).json("No images found.");
                  }
                },
              });
            } else {
              response.status(404).json("Itinerary returned no object data.");
            }
          },
        });
      } else {
        response.status(404).json("Itinerary returned no object data.");
      }
    },
  });
});

ROUTER.post("/save", (request, response) => {
  runStoredProcedure({
    procedure: "saveItinerary",
    parameters: [request.body.itineraryId, JSON.stringify(request.body.objects)],
    resultCallback: ((result) => response.status(200).json(result)),
  });
});

export default ROUTER;