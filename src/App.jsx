import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios from 'axios';

import {loadingCatalog, errorLoadingCatalog, setIsLoading} from '@/redux/reducers/catalogSlice.js';
import {FavoritesPage} from '@/pages/FavoritesPage';
import {LayoutPage} from '@/pages/LayoutPage.jsx';
import {HomePage} from '@/pages/HomePage.jsx';
import {loadingBasket} from '@/redux/reducers/basketSlice.js';
import {loadingFavorites} from '@/redux/reducers/favoritesSlice.js';
import {API} from '@/api/serverUrl.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const App = () => {
  const dispatch = useDispatch();

  useEffect((() => {
    async function fetchData() {
      try {
        dispatch(setIsLoading('loading'));
        const [catalogResponse, basketResponse, favoritesResponse] = await Promise.all([
          axios.get(API.URL_CATALOG),
          axios.get(API.URL_BASKET),
          axios.get(API.URL_FAVORITES),
        ]);

        await delay(2000);

        dispatch(loadingCatalog(catalogResponse.data));
        dispatch(loadingBasket(basketResponse.data));
        dispatch(loadingFavorites(favoritesResponse.data));
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        dispatch(errorLoadingCatalog(error.response));
      }
    }

    fetchData();
  }), []);


  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LayoutPage/>}>
          <Route index element={<HomePage/>}/>
          <Route path="favorites" element={<FavoritesPage/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
