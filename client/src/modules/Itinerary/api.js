import axios from "axios";
import {formatDate} from '../Shared/utils/stringHelpers';

export const createItinerary = (userId, date) =>
  axios.post(`/api/itinerary/create`, { userId, date: formatDate(date)});

export const getItinerariesForUser = (userId) =>
  axios.get(`/api/itinerary/read/forUser`, { params: { userId } });

export const getItineraryById = (id, userId) =>
  axios.get(`/api/itinerary/read`, { params: { id, userId } });