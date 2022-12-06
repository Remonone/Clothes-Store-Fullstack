import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Settings } from "../../types/types";

const initialState: Settings = {
    currency: "EUR",
    language: "EN"
}

const settings = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        switchCurrency: (state, action: PayloadAction<string>) => {
            if(!["USD", "EUR"].some(a => a === action.payload)) return state
            const currency = action.payload
            let settings = JSON.parse(JSON.stringify(state))
            settings['currency'] = currency
            return settings
        },
        switchLanguage: (state, action: PayloadAction<string>) => {
            if(!["EN", "RU", "UA"].some(a => a === action.payload)) return state
            const language = action.payload
            let settings = JSON.parse(JSON.stringify(state))
            settings['language'] = language
            return settings
        }
    }
})

export const settingsReducer = settings.reducer
export const {switchCurrency, switchLanguage} = settings.actions
