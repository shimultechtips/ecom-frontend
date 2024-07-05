import { API } from "../utils/config";
import axios from "axios";

export const getReviews = (id) => {
  return axios.get(`${API}/review/${id}`);
};

export const createReview = (token, data) => {
  return axios.post(`${API}/review`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
