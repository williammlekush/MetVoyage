import axios from "axios";

export const getUserExistsByUsername = (userName) =>
  axios.get(`/api/user/existsByUsername`, { params: { userName } });

export const createUser = (username, password) =>
  axios.post("/api/user/create", { userName: username, passWord: password });
