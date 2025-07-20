import { combineReducers } from "redux";
import { contactsSlice, contMiddleware, contReducer, contReducerPath } from "./reducers/contacts-reducer";
import { groupMiddleware, groupReducer, groupReducerPath, groupSlice } from "./reducers/groups-reducer";
import { favoriteSlice } from "./reducers/favorite-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  favorites: favoriteSlice.reducer,
  groups: groupSlice.reducer,
  [contReducerPath]: contReducer,
  [groupReducerPath]: groupReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([
      contMiddleware,
      groupMiddleware
    ])
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;