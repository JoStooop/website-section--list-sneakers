import React, {useEffect, useState} from 'react';
import s from './Pagination.module.scss';

import angelLeftIcon from '@/assets/images/angle-left.svg';
import angelRightIcon from '@/assets/images/angle-right.svg';

import {getPageCount} from '@/helpers/pagination.js';

const Pagination = ({allGoods, goodsLimit = 8, setCurrentPage}) => {
  const [count, setCount] = useState(1);

  const allPages = getPageCount(allGoods, goodsLimit);

  useEffect(() => {
    setCurrentPage(count);
  });


  const handleClickAdd = () => {
    const condition = count === allPages;

    if (condition) return;

    setCount(count + 1);
  };

  const handleClickBack = () => {
    const condition = count === 1;

    if (condition) return;

    setCount(count - 1);
  };

  return (
    <div className={s.wrap}>
      <img src={angelLeftIcon} onClick={handleClickBack} width={40} height={30}/>
      <p className={s.text}><b>{count}</b> of {allPages}</p>
      <img src={angelRightIcon} onClick={handleClickAdd} width={40} height={30}/>
    </div>
  );
};

export {Pagination};
