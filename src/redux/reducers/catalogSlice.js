import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: 'idle',
  data: [],
  error: null,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    loadingCatalog: (state, action) => {
      state.data = action.payload;
      state.loading = 'success';
    },
    errorLoadingCatalog: (state, action) => {
      state.error = action.payload;
    },
    downloadFavorites: (state, action) => {

    },
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },
    onAddToCart: (state, action) => {
      state.basket.push(action.payload);
    },
    onAddToFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeItemFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((favorite) => favorite.id !== action.payload);
    },
  },
});

export const {
  setIsLoading,
  errorLoadingCatalog,
  loadingCatalog,
  onAddToCart,
  onAddToFavorite,
  removeItemFromCart,
  removeItemFromFavorites,

} = catalogSlice.actions;

export default catalogSlice.reducer;
