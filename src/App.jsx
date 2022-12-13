import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {
  loadingCatalog,
  errorLoadingCatalog,
  setStatusLoadingCatalog,
} from '@/redux/reducers/catalogSlice.js';
import {FavoritesPage} from '@/pages/FavoritesPage';
import {LayoutPage} from '@/pages/LayoutPage.jsx';
import {HomePage} from '@/pages/HomePage.jsx';
import API from '@/api/api.js';
import {ProductPage} from '@/pages/ProductPage.jsx';
import {ErrorPage} from '@/pages/ErrorPage.jsx';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const App = () => {
  const dispatch = useDispatch();

  useEffect((() => {
    async function fetchData() {
      try {
        dispatch(setStatusLoadingCatalog('loading'));
        // dispatch(setStatusLoadingBasket('loading'));
        // dispatch(setStatusLoadingFavorite('loading'));

        const [catalogResp] = await Promise.all([
          API.get('catalog'),
          // API.get('basket'),
          // API.get('favorites'),
        ]);

        // await delay(2000);

        dispatch(loadingCatalog(catalogResp.data));
        // dispatch(loadingBasket(basketResp.data));
        // dispatch(loadingFavorites(favoritesResp.data));
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
          <Route path="card/:id" element={<ProductPage/>}/>
          <Route path="favorites" element={<FavoritesPage/>}/>
          <Route path='*' element={<ErrorPage />}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
