import axios from "axios";

export const getArt = (id) => axios.get(`/api/object/read`, { params: { id } });

export const getArtist = (objectId) =>
  axios.get(`/api/object/read/artist`, { params: { objectId } });

export const getArtAggregateData = (id) =>
  axios.get(`/api/object/read/aggregateData`, { params: { id } });
