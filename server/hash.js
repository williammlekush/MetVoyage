import { createHash } from "crypto";

export const hashSHA256 = (data) => {
  const hash = createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
};
