import express from "express";
import { runStoredProcedure } from "../query.js";

const ROUTER = express.Router();

ROUTER.get("/existsByUsername", (_request, response) => {
  runStoredProcedure({
    procedure: "userExists",
    parameters: [_request.query.userName],
    resultCallback: (result) => response.status(200).json(result[0].length > 0),
  });
});

ROUTER.post("/create", (_request, response) => {
  runStoredProcedure({
    procedure: "insertUser",
    parameters: [_request.body.userName, _request.body.passWord],
    resultCallback: (result) => {
      if (result.affectedRows === 0)
        response
          .status(409)
          .json(
            "User could not be created. Try again with a different username."
          );
      else response.status(200).json(result);
    },
  });
});

export default ROUTER;
