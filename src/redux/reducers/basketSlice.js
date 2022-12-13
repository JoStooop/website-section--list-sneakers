import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: 'success',
  data: [],
  error: null,
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    loadingBasket: (state, action) => {
      state.data = action.payload;
      state.loading = 'success';
    },
    setStatusLoadingBasket: (state, action) => {
      state.loading = action.payload;
    },
    errorLoadingBasket: (state, action) => {
      state.error = action.payload;
    },
    addToBasket: (state, action) => {
      state.data.push(action.payload);
    },
    setDataBasket: (state, action) => {
      state.data = state.data.filter((item) => Number(item.id) !== Number(action.payload));
    },
    removeItemFromBasket: (state, action) => {
      state.data = state.data.filter((item) => Number(item.id) !== action.payload);
    },
    clearBasket: (state, action) => {
      state.data = [];
    },
  }
  ,
});

export const {
  loadingBasket,
  setStatusLoadingBasket,
  errorLoadingBasket,
  addToBasket,
  setDataBasket,
  removeItemFromBasket,
  clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
