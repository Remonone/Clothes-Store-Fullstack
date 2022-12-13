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

interface ILoginCredentials {
    email: string
    password: string
}

export const login = createAsyncThunk('login', async (loginData:ILoginCredentials) => {
    const {email, password} = loginData
    const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        email, password
    })
    const user = await axios.get('http://localhost:8000/api/v1/users/profile', {
        headers: {authorization: response.data.webToken}
    })
    return user.data as User
})

const auth = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(login.fulfilled, (state, action) => {
                return action.payload;
            })
    },
})

export const authReducer = auth.reducer
