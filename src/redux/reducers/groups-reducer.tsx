import { createSlice } from "@reduxjs/toolkit";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GroupsState {
  loadingGroups: boolean;
  groupContacts: GroupContactsDto[];
  errorGroups: string | null;
}

const initialState: GroupsState = {
  loadingGroups: false,
  groupContacts: [],
  errorGroups: null,
};

interface Response<T> {
  data: T;
  status: number;
}

export const groupSlice = createSlice({
  name: 'groups',
  initialState: initialState,
  reducers: {}
})

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/398/h'
  }),
  endpoints: (builder) => ({
    getGroup: builder.query<Response<GroupContactsDto[]>, void>({
      query: () => '/e6c614d4c59fd9b546fb5abdfb456dd5.json'
    })
  })
});

export const groupReducer = groupApi.reducer;
export const groupReducerPath = groupApi.reducerPath;
export const groupMiddleware = groupApi.middleware;

export const { useGetGroupQuery } = groupApi;