import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: 'idle',
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
    errorLoadingFavorite: (state, action) => {
      state.error = action.payload;
    },
    addToFavorites: (state, action) => {
      state.data.push(action.payload);
    },
    setFavoritesItems: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    test: (state, action) => {
      state.data.map((el) => {
        if (el.id === action.payload) {
          return {
            ...el,
            id: action.payload,
          };
        }
        return el;
      });
    },
  },
});

export const {
  loadingFavorites,
  errorLoadingFavorite,
  addToFavorites,
  setFavoritesItems,
  test,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
