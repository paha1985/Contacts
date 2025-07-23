import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactDto } from "src/types/dto/ContactDto";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ContactsState {
  current: ContactDto | null;
  loading: boolean;
  contacts: ContactDto[];
  error: string | null;
}

const initialState: ContactsState = {
  current: null,
  loading: false,
  contacts: [],
  error: null,
};

interface Response<T> {
  data: T;
  status: number;
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    setCurrentContact: (state, action: PayloadAction<ContactDto>) => {
      state.current = action.payload;
    }
  }
});

export const { setCurrentContact } = contactsSlice.actions;


export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/280/h'
  }),
  endpoints: builder => ({
    getContacts: builder.query<Response<ContactDto>, void>({
      query() {
        return {
          url: '/3f9021c6ea91fc0306ceb0e9c2f2e56c.json'
        }
      }
    })
  })
})

export const contactsReducer = contactsApi.reducer;
export const contReducerPath = contactsApi.reducerPath;
export const contactsMiddleware = contactsApi.middleware;

export const { useGetContactsQuery } = contactsApi;