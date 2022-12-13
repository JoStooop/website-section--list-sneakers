import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from '@/components/card/Card.jsx';
import {errorLoadingFavorite, setFavoritesItems} from '@/redux/reducers/favoritesSlice.js';

const FavoritesPage = () => {
  const dispatch = useDispatch();

  const {data, loading} = useSelector((state) => state.favorites);

  const onClickFavorite = async (item) => {
    try {
      dispatch(setFavoritesItems(item.id));
    } catch (e) {
      alert('Ошибка при удалении из избранного');
      dispatch(errorLoadingFavorite(e.response));
    }
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {data.length > 0 ?
          data.map((item, index) => (
            <Card key={index}
              id={item.id}
              onClickFavorite={() => onClickFavorite(item)}
              favorite={true}
              loading={loading} {...item} />
          )) :
          <div >Вы не добавили товар в избранное</div>
        }
      </div>
    </div>
  );
};

export {FavoritesPage};
