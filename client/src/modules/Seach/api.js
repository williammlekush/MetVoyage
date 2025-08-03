import axios from "axios";

export const getObjectOptions = (columnPlural) =>
  axios.get(`/api/object/read/distinct${columnPlural}`);

export const getArtistOptions = () =>
  axios.get("/api/artist/read/distinctNames");
