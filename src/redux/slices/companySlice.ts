import { createSlice } from "@reduxjs/toolkit";

const initialState={

companies:[],
loading:false

};

const companySlice=
createSlice({

name:"company",

initialState,

reducers:{}

});

export default
companySlice.reducer;