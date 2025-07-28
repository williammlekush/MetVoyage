import axios from "axios";

export const getIsUsernameValid = (userName) =>
  axios.get(`/api/user/isUsernameValid`, { params: { userName } });
