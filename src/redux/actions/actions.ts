import { ContactDto } from '../../types/dto/ContactDto'
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__';
import { RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return DATA_CONTACT;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { getState, rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const state = getState() as RootState;
      const { ids } = state.favorites;
      const { contacts } = state.contacts;
      return contacts.filter((contact: ContactDto) => ids.includes(contact.id));
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchGroups = createAsyncThunk(
  'contacts/fetchGroups',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return DATA_GROUP_CONTACT;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

interface SetFavoriteIdsAction {
  type: 'SET_FAVORITE_IDS';
  payload: string[];
}

export const setFavoriteIds = (ids: string[]): SetFavoriteIdsAction => ({
  type: 'SET_FAVORITE_IDS',
  payload: ids
});

