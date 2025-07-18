import { DATA_CONTACT } from "src/__data__";
import {
  fetchContacts
} from "../actions/actions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactDto } from "src/types/dto/ContactDto";

interface ContactsState {
  current: ContactDto | null;
  loading: boolean;
  contacts: ContactDto[];
  error: string | null;
}

const initialState: ContactsState = {
  current: DATA_CONTACT[3],
  loading: false,
  contacts: DATA_CONTACT,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    setCurrentContact: (state, action: PayloadAction<ContactDto>) => {
      state.current = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setCurrentContact } = contactsSlice.actions;