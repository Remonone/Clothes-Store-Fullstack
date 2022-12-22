import { createSlice } from "@reduxjs/toolkit";

const bestProducts = createSlice({
    name: 'best_products',
    initialState: [],
    reducers: {}
})

export const bestProductsReducer = bestProducts.reducer