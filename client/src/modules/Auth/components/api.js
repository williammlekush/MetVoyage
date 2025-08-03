import axios from "axios";

export const getUserExistsByUsername = (username) =>
  axios.get(`/api/user/existsByUsername`, { params: { userName: username } });

export const getUserByUsernamePassword = (username, password) =>
  axios.get("/api/user/readIdByUsernamePassword", {
    params: { userName: username, passWord: password },
  });

export const createUser = (username, password) =>
  axios.post("/api/user/create", { userName: username, passWord: password });
