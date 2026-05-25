import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCompaniesApi, getCompanyByIdApi } from "../../services/company.service";
import { createCompanyApi } from "../../services/companyApi";
import { createReviewApi } from "../../services/reviewApi";

export const getCompanies = createAsyncThunk(
    "company/getCompanies",
    async ({ page, search, city, sort }: { page: number; search: string; city: string; sort: string; }) => {

        const response = await getCompaniesApi(page, 10, search, city, sort);
        return response.data;
    }
);


export const getCompanyById = createAsyncThunk(
    "company/getCompanyById",

    async ({ id }: { id: string }) => {
        const response = await getCompanyByIdApi(id);
        console.log(response);
        
        return response.data;
    }
);

export const addCompany = createAsyncThunk(
  "company/addCompany",
  async (companyData: {
    name: string;
    location: string;
    city: string;
    foundedOn?: string;
    logo?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await createCompanyApi(companyData);
      return response.data; // This matches your backend ApiResponse structure
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add company");
    }
  }
);

export const addReview = createAsyncThunk(
  "company/addReview",
  async (reviewData: {
    companyId: string;
    reviewerName: string;
    rating: number;
    title: string;
    comment: string;
    pros: string[];
    cons: string[];
  }, { rejectWithValue }) => {
    try {
      const response = await createReviewApi(reviewData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add review");
    }
  }
);

