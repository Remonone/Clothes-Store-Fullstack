import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { accountReducer, authentication } from './reducers/AccountReducer';
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
    settings: settingsReducer,
    auth: authReducer,
    accountReducer
  },
  preloadedState: loadState()
});

store.subscribe(
  function() {
    const state = store.getState()
    saveState({auth: state.auth, settings: state.settings})
  }
)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
