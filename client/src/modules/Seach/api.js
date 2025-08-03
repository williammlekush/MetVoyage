import axios from "axios";

export const getObjectOptions = (columnPlural) =>
  axios.get(`/api/object/readDistinct${columnPlural}`);

export const getArtistOptions = () =>
  axios.get("/api/artist/readDistinctNames");
