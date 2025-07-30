import axios from "axios";

export const getIsUsernameValid = (userName) =>
  axios.get(`/api/user/isUsernameValid`, { params: { userName } });

export const createUser = (username, password) =>
  axios.post("/api/user/create", { userName: username, passWord: password });
