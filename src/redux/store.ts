import { combineReducers } from "redux";
import { contactsSlice } from "./reducers/contacts-reducer";
import gpoupsReducer from "./reducers/groups-reducer";
import { favoritesReducer } from "./reducers/favorite-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  favorites: favoritesReducer,
  groups: gpoupsReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;