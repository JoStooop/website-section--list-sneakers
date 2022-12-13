import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: 'success',
  data: [],
  error: null,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    loadingFavorites: (state, action) => {
      state.data = action.payload,
      state.loading = 'success';
    },
    setStatusLoadingFavorite: (state, action) => {
      state.loading = action.payload;
    },
    errorLoadingFavorite: (state, action) => {
      state.error = action.payload;
    },
    addToFavorites: (state, action) => {
      state.data.push(action.payload);
    },
    setFavoritesItems: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  loadingFavorites,
  setStatusLoadingFavorite,
  errorLoadingFavorite,
  addToFavorites,
  setFavoritesItems,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
