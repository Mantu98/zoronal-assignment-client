import { createSlice } from "@reduxjs/toolkit";
import type { Review } from "../../types/review";

interface ReviewState {
  reviews: Review[];
  loading: boolean;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
});

export default reviewSlice.reducer;