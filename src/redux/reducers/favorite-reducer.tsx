import { ContactDto } from 'src/types/dto/ContactDto';
import { fetchFavorites } from '../actions/actions';
import { DATA_CONTACT } from 'src/__data__';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  items: ContactDto[];
  ids: string[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  ids: [DATA_CONTACT[0].id, DATA_CONTACT[1].id, DATA_CONTACT[2].id, DATA_CONTACT[3].id],
  loading: false,
  error: null
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<ContactDto[]>) => {
      state.items = action.payload;
    },
    setFavoriteIds: (state, action: PayloadAction<string[]>) => {
      state.ids = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
})

export const { setFavorites, setFavoriteIds } = favoriteSlice.actions;