import api from "./api";
import type { CreateReviewPayload } from "../types/review";

export const getReviewsApi = (companyId: string) => {
  return api.get(`/review/${companyId}`);
};

export const createReviewApi = (data: CreateReviewPayload) => {
  return api.post("/review", data);
};