import { debounce } from '@mui/material';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authReducer } from './reducers/AuthReducer';
import { settingsReducer } from './reducers/SettingsReducer';

const KEY = 'app'

const loadState = () => {
  try{
    const savedState = localStorage.getItem(KEY)
    if(!savedState) return undefined
    return JSON.parse(savedState)
  } catch(e) {
    return undefined
  }
}

export const saveState = (store:any) => {
  try {
    const serializedState = JSON.stringify(store);
    localStorage.setItem(KEY, serializedState);
  } catch (e) { }
}

export const store = configureStore({
  reducer: {
    settingsReducer,
    authReducer
  },
  preloadedState: loadState()
});

store.subscribe(
  debounce(() => {
    const state = store.getState()
    saveState({authReducer: state.authReducer, settingsReducer: state.settingsReducer})
  }, 1000)
)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
