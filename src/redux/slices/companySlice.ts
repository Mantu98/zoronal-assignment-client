import { createSlice } from "@reduxjs/toolkit";
import type { Company } from "../../types/company";

interface CompanyState {
  companies: Company[];
  loading: boolean;
}

const initialState: CompanyState = {
  companies: [],
  loading: false,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
});

export default companySlice.reducer;