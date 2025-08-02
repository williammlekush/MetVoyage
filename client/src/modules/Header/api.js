import axios from "axios";

export const updateDisplayName = (id, name) =>
  axios.post("/api/user/updateDisplayName", { userId: id, name: name });
