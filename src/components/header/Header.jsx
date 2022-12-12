import React, {useState} from 'react';
import s from './Header.module.scss';

import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import cartIcon from '@/assets/images/cart.svg';
import logoIcon from '@/assets/images/logo.png';
import heartIcon from '@/assets/images/heart.png';
import heartLikedIcon from '@/assets/images/heart-liked.svg';
import userIcon from '@/assets/images/user.svg';

import {getLengthOfArrayElements, getTotalPriceBasket} from '@/redux/selectors/catalogSelector.js';
import {Drawer} from '@/components/drawer/Drawer';


const Header = () => {
  const [cartOpened, setCartOpened] = useState(false);

  const totalPriceBasket = useSelector(getTotalPriceBasket);
  const isFavorites = useSelector(getLengthOfArrayElements);

  return (
    <>
      <header className={s.header}>
        <Link to="/">
          <div className={s.company}>
            <img width={40} height={40} src={logoIcon} alt="logo"/>
            <div>
              <h3 className={s.title}>React Sneakers</h3>
              <p className={s.desc}>Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
        <ul className={s.list}>
          <li className={s.item} onClick={() => setCartOpened(true)}>
            <img width={18} height={18} src={cartIcon} alt="basket"/>
            <span>{totalPriceBasket} руб.</span>
          </li>
          <li className={s.item}>
            <Link to="/favorites">
              <img width={18} height={18} src={isFavorites > 0 ? heartLikedIcon : heartIcon} alt="favorites"/>
            </Link>
          </li>
          <li className={s.item}>
            <Link to="/">
              <img width={18} height={18} src={userIcon} alt="user"/>
            </Link>
          </li>
        </ul>
      </header>
      <Drawer cartOpened={cartOpened} setCartOpened={setCartOpened}/>
    </>
  );
};

export {Header};
