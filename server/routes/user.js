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

ROUTER.get("/readIdByUsernamePassword", (_request, response) => {
  runStoredProcedure({
    procedure: "signIn",
    parameters: [_request.query.userName, hashSha256(_request.query.passWord)],
    resultCallback: (result) => {
      const data = result[0];
      if (data.length === 1) response.status(200).json(data[0]);
      else response.status(403).json("Sign in failed. Try again.");
    },
  });
});

ROUTER.post("/create", (_request, response) => {
  runStoredProcedure({
    procedure: "insertUser",
    parameters: [_request.body.userName, hashSha256(_request.body.passWord)],
    resultCallback: (result) => {
      const data = result[0];
      if (data.length === 1) response.status(200).json(data[0]);
      else
        response
          .status(409)
          .json(
            "User could not be created. Try again with a different username."
          );
    },
  });
});

ROUTER.post("/updateDisplayName", (_request, response) => {
  runStoredProcedure({
    procedure: "updateUserDisplayName",
    parameters: [_request.body.userId, _request.body.name],
    resultCallback: (result) => {
      const success = result.affectedRows > 0;
      if (success) response.status(200).json(success);
      else response.status(409).json("Display name update failed.");
    },
  });
});

ROUTER.get("/read/userOptions", (_request, response) => {
  runStoredProcedure({
    procedure: "loadUserOptions",
    parameters: [],
    resultCallback: (result) => response.status(200).json(result),
  });
});

export default ROUTER;
