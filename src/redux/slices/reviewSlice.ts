import { createSlice } from "@reduxjs/toolkit";

const initialState={

reviews:[],
loading:false

};

const reviewSlice=
createSlice({

name:"review",

initialState,

reducers:{}

});

export default
reviewSlice.reducer;