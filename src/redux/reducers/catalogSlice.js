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
    setStatusLoadingCatalog: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setStatusLoadingCatalog,
  errorLoadingCatalog,
  loadingCatalog,
} = catalogSlice.actions;

export default catalogSlice.reducer;
