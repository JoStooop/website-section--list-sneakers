import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: 'idle',
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
    errorLoadingBasket: (state, action) => {
      state.error = action.payload;
    },
    addToBasket: (state, action) => {
      state.data.push(action.payload);
    },
    setBasketItems: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    removeItemFromBasket: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    clearBasket: (state, action) => {
      state.data = [];
    },
  }
  ,
});

export const {
  loadingBasket,
  errorLoadingBasket,
  addToBasket,
  setBasketItems,
  removeItemFromBasket,
  clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
