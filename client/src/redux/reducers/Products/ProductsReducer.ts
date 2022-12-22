import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
    name: 'products',
    initialState: [],
    reducers: {}
})

export const productsReducer = products.reducer