import { applyMiddleware, combineReducers, createStore } from "redux";
import contactsReducer from "./reducers/contacts-reducer";
import gpoupsReducer from "./reducers/groups-reducer";
import { favoritesReducer } from "./reducers/favorite-reducer";
import {thunk} from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  favorites: favoritesReducer,
  groups: gpoupsReducer
});

// @ts-ignore
// export const store = createStore(
//   rootReducer, applyMiddleware(thunk)
// );

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

export type RootState = ReturnType<typeof rootReducer>;