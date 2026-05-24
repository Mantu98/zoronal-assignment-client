import api from "./api";

export const getCompaniesApi = (
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  return api.get(
    `/company?page=${page}&limit=${limit}&search=${search}`
  );
};