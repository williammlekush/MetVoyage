import axios from "axios";
import {formatDate} from '../Shared/utils/stringHelpers';

export const createItinerary = (userId, date) =>
  axios.post(`/api/itinerary/create`, { userId, date: "'" + formatDate(date) + "'" });