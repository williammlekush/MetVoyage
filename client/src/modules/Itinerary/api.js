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