import { combineReducers } from "redux";
import { contactsSlice } from "./reducers/contacts-reducer";
import { groupSlice } from "./reducers/groups-reducer";
import { favoriteSlice } from "./reducers/favorite-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  favorites: favoriteSlice.reducer,
  groups: groupSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;