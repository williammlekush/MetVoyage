import axios from "axios";

export const getObjectOptions = (columnPlural) =>
  axios.get(`/api/object/read/distinct${columnPlural}`);

export const getArtistOptions = () =>
  axios.get("/api/artist/read/distinctNames");

export const searchObjects = (filters, resetCache) =>
  axios.get("/api/object/read/filteredObjects", {
    params: { ...filters, resetCache: resetCache },
  });
