import { DATA_GROUP_CONTACT } from "src/__data__";
import { fetchGroups } from "../actions/actions";
import { createSlice } from "@reduxjs/toolkit";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

interface GroupsState {
  loadingGroups: boolean;
  groupContacts: GroupContactsDto[];
  errorGroups: string | null;
}

const initialState: GroupsState = {
  loadingGroups: false,
  groupContacts: DATA_GROUP_CONTACT,
  errorGroups: null,
};

export const groupSlice = createSlice({
  name: 'groups',
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loadingGroups = true;
        state.errorGroups = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loadingGroups = false;
        state.groupContacts = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loadingGroups = false;
        state.errorGroups = action.payload as string;
      })
})
