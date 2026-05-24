import api from "./api";

export const getReviewsApi = (
    companyId: string
) => {

    return api.get(
        `/review/${companyId}`
    );
};

export const createReviewApi = (
    data: any
) => {

    return api.post(
        "/review",
        data
    );
};