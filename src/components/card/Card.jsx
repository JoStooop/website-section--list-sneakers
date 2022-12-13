import React from 'react';
import s from './Card.module.scss';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import ContentLoader from 'react-content-loader';

import heartUnLikedIcon from '@/assets/images/heart-unliked.svg';
import heartLikedIcon from '@/assets/images/heart-liked.svg';
import plusIcon from '@/assets/images/plus.svg';
import greenTickIcon from '@/assets/images/green-tick.png';

import {getElementIdInArray} from '@/redux/selectors/catalogSelector.js';

const Card = ({favorite, onClickFavorite, onClickPlus, loading = 'loading', onPlus, ...item}) => {
  const {title, imageUrl, price} = item;

  const isItemInFavorites = useSelector((state) => getElementIdInArray(state.favorites.data, item.id));
  const isItemInBasket = useSelector((state) => getElementIdInArray(state.basket.data, item.id));

  return (
    <div className={s.card}>
      {loading === 'success' ? (
        <>
          <div className={s.favorite} onClick={onClickFavorite}>
            <img src={isItemInFavorites ? heartLikedIcon : heartUnLikedIcon} alt="unliked"/>
          </div>
          <Link to={`card/${item.id}`}>
            <img src={imageUrl} alt="sneakers" width={150} height={135}/>
          </Link>
          <h5>{title}</h5>
          <div className={s.cardBottom}>
            <div className={s.cardInfo}>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <button className={s.button} onClick={() => onClickPlus(item)}>
                {isItemInBasket ?
                  <img src={greenTickIcon} alt='tick' width={22} height={22}/> :
                  <img src={plusIcon} alt="plus" width={11} height={11}/>}
              </button>
            )}
          </div>
        </>
      ) : (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155"/>
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
        </ContentLoader>
      )
      }
    </div>

  );
};

export {Card};
