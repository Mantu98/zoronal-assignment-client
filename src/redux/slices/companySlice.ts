import {
  createSlice
}
  from "@reduxjs/toolkit";

import type {
  Company
}
  from "../../types/company";
import { addCompany, addReview, getCompanies, getCompanyById } from "../company/companyThunk";
import type { Review } from "../../types/review";

interface CompanyState {
  companies: Company[];
  selectedCompany: Company | null;

  reviews: Review[];

  loading: boolean;
  detailLoading: boolean;

  hasMore: boolean;
}

const initialState: CompanyState = {
  companies: [],
  selectedCompany: null,
  reviews: [],

  loading: false,
  detailLoading: false,

  hasMore: true,
};

const companySlice =
  createSlice({

    name: "company",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
      builder

        // ================= LIST =================
        .addCase(getCompanies.pending, (state) => {
          state.loading = true;
        })

        .addCase(getCompanies.fulfilled, (state, action) => {
          state.loading = false;

          const { companies, pagination } = action.payload.data;

          if (!Array.isArray(companies)) return;

          if (pagination.page === 1) {
            state.companies = companies;
          } else {
            const existingIds = new Set(state.companies.map(c => c?._id));

            const newItems = companies.filter(
              c => c?._id && !existingIds.has(c._id)
            );

            state.companies = [...state.companies, ...newItems];
          }

          state.hasMore = pagination.page < pagination.totalPages;
        })

        .addCase(getCompanies.rejected, (state) => {
          state.loading = false;
        })

        // ================= DETAIL =================
        .addCase(getCompanyById.pending, (state) => {
          state.detailLoading = true;
        })

        .addCase(getCompanyById.fulfilled, (state, action) => {
          state.detailLoading = false;

          state.selectedCompany = action.payload.data;
          state.reviews = action.payload.data.reviews || [];
        })

        .addCase(getCompanyById.rejected, (state) => {
          state.detailLoading = false;
        }).addCase(addCompany.fulfilled, (state, action) => {
          // Push the newly created company to the top of the list
          if (action.payload?.data) {
            state.companies.unshift(action.payload.data);
          }
        }).addCase(addReview.fulfilled, (state, action) => {
          if (action.payload?.data) {
            const newReview = action.payload.data;

            // 1. Add review to the top of the list
            state.reviews.unshift(newReview);

            // 2. Dynamically update the selected company's rating and review count
            if (state.selectedCompany) {
              const newTotal = state.reviews.length;
              const newAverage = state.reviews.reduce((acc, item) => acc + item.rating, 0) / newTotal;

              state.selectedCompany.totalReviews = newTotal;
              state.selectedCompany.overallRating = Number(newAverage.toFixed(1));
            }
          }
        })

    }

  });

export default
  companySlice.reducer;