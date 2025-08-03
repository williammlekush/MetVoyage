import express from "express";
import { runStoredProcedure } from "../query.js";
import { cacheGuard, setCache } from "../cache.js";
import { pendingGuard } from "../pending.js";

const ROUTER = express.Router();

ROUTER.get("/read/distinctNames", (_request, response) => {
  const key = "artistNames";

  pendingGuard(
    key,
    () =>
      new Promise((resolve, _reject) => {
        const cachedData = cacheGuard(key, () =>
          runStoredProcedure({
            procedure: "loadArtistNames",
            parameters: [],
            resultCallback: (result) => {
              const data = result[0];
              if (data?.length > 0) {
                setCache(key, data);
                response.status(200).json(data);
                resolve();
              } else {
                response.status(404).json("No artists found.");
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

export default ROUTER;
