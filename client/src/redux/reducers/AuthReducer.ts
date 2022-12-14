import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    token: '',
    isAuthenticated: false
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
    return response.data.webToken as string
})

const auth = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        logout: state => ({token: '', isAuthenticated: false}) 
    },
    extraReducers: (build) => {
        build
            .addCase(login.fulfilled, (state, action) => {
                return {
                    token: action.payload,
                    isAuthenticated: true
                };
            })
    },
})

export const authReducer = auth.reducer
