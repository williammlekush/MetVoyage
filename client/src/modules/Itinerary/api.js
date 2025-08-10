import axios from "axios";
import {formatDate} from '../Shared/utils/stringHelpers';

export const createItinerary = (userId, date) =>
  axios.post(`/api/itinerary/create`, { userId, date: formatDate(date)});

export const getItinerariesForUser = (userId) =>
  axios.get(`/api/itinerary/read/forUser`, { params: { userId } });

export const getItineraryById = (id, userId) =>
  axios.get(`/api/itinerary/read`, { params: { id, userId } });

export const getObjectsForItinerary = (itineraryId) =>
  axios.get(`/api/itinerary/read/objects`, { params: { itineraryId } });

export const getUsersForItinerary = (itineraryId) =>
  axios.get(`/api/itinerary/read/users`, { params: { itineraryId } });

export const unShareItinerary = (itineraryId, userId) =>
  axios.post(`/api/itinerary/unshare`, { itineraryId, userId });

export const shareItinerary = (itineraryId, userId) =>
  axios.post(`/api/itinerary/share`, { itineraryId, userId });

export const getUserOptions = () =>
  axios.get(`/api/user/read/userOptions`);

export const clearItinerary = (itineraryId) =>
  axios.post(`/api/itinerary/clear`, { itineraryId });

export const deleteItinerary = (itineraryId) =>
  axios.post(`/api/itinerary/delete`, { itineraryId });

export const saveItinerary = (itineraryId, objects) =>
  axios.post(`/api/itinerary/save`, { itineraryId, objects });