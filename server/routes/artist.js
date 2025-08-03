import express from "express";
import { runStoredProcedure } from "../query.js";

const ROUTER = express.Router();

ROUTER.get("/read/distinctNames", (_request, response) =>
  runStoredProcedure({
    procedure: "loadArtistNames",
    parameters: [],
    resultCallback: (result) => {
      const data = result[0];
      if (data?.length > 0) response.status(200).json(data);
      else response.status(404).json("No artists found.");
    },
  })
);

export default ROUTER;
