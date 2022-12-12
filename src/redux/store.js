import {configureStore} from '@reduxjs/toolkit';

import catalogReducer from '@/redux/reducers/catalogSlice.js';
import basketReducer from '@/redux/reducers/basketSlice.js';
import favoritesReducer from '@/redux/reducers/favoritesSlice.js';


export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    basket: basketReducer,
    favorites: favoritesReducer,
  },
});
