import express from "express";
import { runStoredProcedure } from "../query.js";

const ROUTER = express.Router();

ROUTER.get("/isUsernameValid", (_request, response) => {
  runStoredProcedure({
    procedure: "userExists",
    parameters: [`'${_request.query.userName}'`],
    resultCallback: (result) =>
      response.status(200).json(result[0].length === 0),
  });
});

export default ROUTER;
