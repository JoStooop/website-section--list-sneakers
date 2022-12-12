import React, {useState} from 'react';
import searchIcon from '@/assets/images/search.svg';
import {Card} from '@/components/card/Card.jsx';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {addToBasket, errorLoadingBasket, setBasketItems} from '@/redux/reducers/basketSlice.js';
import {addToFavorites, errorLoadingFavorite, setFavoritesItems} from '@/redux/reducers/favoritesSlice.js';
import {Pagination} from '@/components/common/myPagination/Pagination';
import {getLimitedListOutput} from '@/helpers/pagination.js';
import {API} from '@/api/serverUrl.js';
import {getItemsBasket, getItemsCatalog, getItemsFavorites} from '@/redux/selectors/catalogSelector.js';

const HomePage = () => {
  const dispatch = useDispatch();

  const catalog = useSelector(getItemsCatalog);
  const itemsBasket = useSelector(getItemsBasket);
  const favoritesItems = useSelector(getItemsFavorites);
  const {loading} = useSelector((state) => state.catalog);


  const [page, setPage] = useState(1);
  const [goodsLimit] = useState(4);
  const [searchValue, setSearchValue] = useState('');

  const changePage = (count) => {
    setPage(count);
  };

  const catalogLimited = getLimitedListOutput(catalog, page, goodsLimit);

  const onClickPlus = async (item) => {
    try {
      const findItemBasket = itemsBasket.find((el) => Number(el.id) === Number(item.id));
      if (findItemBasket) {
        await axios.delete(`${API.URL_BASKET}/${item.id}`);
        dispatch(setBasketItems(findItemBasket.id));
      } else {
        const {data} = await axios.post(API.URL_BASKET, item);
        dispatch(addToBasket(data));
      }
    } catch (e) {
      alert('Ошибка при добавлении в корзину');
      dispatch(errorLoadingBasket(e.response));
    }
  };


  const onClickFavorite = async (item) => {
    try {
      const findItem = favoritesItems.find((el) => Number(el.id) === Number(item.id));
      if (findItem) {
        await axios.delete(`${API.URL_FAVORITES}/${item.id}`);
        dispatch(setFavoritesItems(findItem.id));
      } else {
        const {data} = await axios.post(API.URL_FAVORITES, item);
        dispatch(addToFavorites(data));
      }
    } catch (e) {
      alert('Ошибка при добавлении в избранное');
      dispatch(errorLoadingFavorite(e.response));
      console.log(e);
    }
  };

  const renderItems = () => {
    const filteredItems = catalogLimited.filter((item) => {
      return item.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    return (loading === 'loading' ? [...Array(goodsLimit)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        id={index}
        onPlus={true}
        onClickPlus={onClickPlus}
        onClickFavorite={() => onClickFavorite(item)}
        loading={loading}
        {...item}
      />
    ));
  };


  return (
    <div className='content'>
      <div className='contentWrap'>
        <h1 className='contentTitle'>Все кроссовки</h1>
        {loading === 'loading' ? null : (
          <div className='search-block'>
            <img src={searchIcon} alt="search"/>
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Поиск...'/>
          </div>
        )}
      </div>
      <div className="sneakersList">
        {renderItems()}
      </div>
      {loading === 'loading' ? null : <Pagination allGoods={catalog.length} goodsLimit={goodsLimit} setCurrentPage={changePage}/> }
    </div>
  );
};

export {HomePage};
