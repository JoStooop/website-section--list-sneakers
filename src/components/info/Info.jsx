import React from 'react';
import s from './Info.module.scss';

import arrowIcon from '@/assets/images/arrow.svg';

import {MyGreenButton} from '@/components/common/myGreenButton/MyGreenButton';


const Info = ({title, image, desc, setCartOpened}) => {
  return (
    <div className={s.wrap}>
      <img className={s.img} width={120} src={image} alt="empty"/>
      <h2>{title}</h2>
      <p className={s.desc}>{desc}</p>
      <MyGreenButton onClick={() => setCartOpened(false)}>
        Вернуться назад
        <img src={arrowIcon} alt="arrow"/>
      </MyGreenButton>
    </div>
  );
};

export {Info};
