import { combineReducers } from "redux";
import { contactsSlice, contactsMiddleware, contactsReducer, contReducerPath } from "./reducers/contacts-reducer";
import { groupMiddleware, groupReducer, groupReducerPath, groupSlice } from "./reducers/groups-reducer";
import { favoriteSlice } from "./reducers/favorite-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  favorites: favoriteSlice.reducer,
  groups: groupSlice.reducer,
  [contReducerPath]: contactsReducer,
  [groupReducerPath]: groupReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([
      contactsMiddleware,
      groupMiddleware
    ])
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;