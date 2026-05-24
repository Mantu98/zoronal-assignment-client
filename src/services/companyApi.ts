import api from "./api";

export const getCompaniesApi = (
    page = 1,
    limit = 10,
    search = ""
) => {

    return api.get(
        `/company?page=${page}&limit=${limit}&search=${search}`
    );
};

export const getCompanyByIdApi = (
    id: string
) => {

    return api.get(
        `/company/${id}`
    );
};