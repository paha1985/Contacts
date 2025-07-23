import { ContactDto } from '../../types/dto/ContactDto'
import { RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

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


interface SetFavoriteIdsAction {
  type: 'SET_FAVORITE_IDS';
  payload: string[];
}

export const setFavoriteIds = (ids: string[]): SetFavoriteIdsAction => ({
  type: 'SET_FAVORITE_IDS',
  payload: ids
});

