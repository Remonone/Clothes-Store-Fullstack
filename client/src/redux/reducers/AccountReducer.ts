import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/types";

const initialState: User = {
    _id: '',
    username: '',
    email: '',
    avatar: '',
    cart: []
}

export const authentication = createAsyncThunk('authenticate', async (token: string) => {
    const user = await axios.get('http://localhost:8000/api/v1/users/profile', {
        headers: {authorization: token}
    })
    return user.data as User
})

const account = createSlice({
    name: 'account',
    initialState,
    reducers: {

    },
    extraReducers: build => {
        build.addCase(authentication.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const accountReducer = account.reducer