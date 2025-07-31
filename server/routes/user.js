import express from "express";
import { runStoredProcedure } from "../query.js";
import { createHash } from "crypto";

const hashSha256 = (data) => {
  const hash = createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
};

const ROUTER = express.Router();

ROUTER.get("/existsByUsername", (_request, response) => {
  runStoredProcedure({
    procedure: "userExists",
    parameters: [_request.query.userName],
    resultCallback: (result) => response.status(200).json(result[0].length > 0),
  });
});

ROUTER.get("/existsByUsernamePassword", (_request, response) => {
  runStoredProcedure({
    procedure: "signIn",
    parameters: [_request.query.userName, hashSha256(_request.query.passWord)],
    resultCallback: (result) => {
      const success = result[0].length === 1;
      if (success) response.status(200).json(success);
      else response.status(401).json("Sign in failed. Try again.");
    },
  });
});

ROUTER.post("/create", (_request, response) => {
  runStoredProcedure({
    procedure: "insertUser",
    parameters: [_request.body.userName, hashSha256(_request.body.passWord)],
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
