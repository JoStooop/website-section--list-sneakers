import React, {useState} from 'react';
import s from './ProductItem.module.scss';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {getElementIdInArray, getItemsBasket} from '@/redux/selectors/catalogSelector.js';
import {addToBasket, errorLoadingBasket, setDataBasket} from '@/redux/reducers/basketSlice.js';
import {MyGreenButton} from '@/components/common/myGreenButton/MyGreenButton';


const ProductItem = () => {
  const dispatch = useDispatch();

  const {id} = useParams();

  const itemsBasket = useSelector(getItemsBasket);

  const [itemInCart, setItemInCart] = useState(false);

  const item = useSelector((state) => getElementIdInArray(state.catalog.data, id));

  const onClickPlus = async () => {
    try {
      const findItemBasket = await itemsBasket.find((el) => Number(el.id) === Number(item.id));
      if (findItemBasket) {
        dispatch(setDataBasket(findItemBasket.id));
        setItemInCart(false);
      } else {
        dispatch(addToBasket(item));
        setItemInCart(true);
      }
    } catch (e) {
      alert('Ошибка при добавлении в корзину');
      dispatch(errorLoadingBasket(e.response));
    }
  };


  return (
    <div className={s.wrap}>
      <div className={s.leftBlock}>
        <img src={item?.imageUrl} alt="shoe" width={400} height={400}/>
      </div>
      <div className={s.rightBlock}>
        <div className={s.productInfo}>
          <div className={s.title}>
            <h2>Airmax</h2>
          </div>
          <div className={s.details}>
            <h3>{item?.title}</h3>
            <h4>{item?.price}</h4>
          </div>
          <ul>
            <li>SIZE</li>
            <li className={s.bg}>{item?.options?.size}</li>
          </ul>
          <ul>
            <li>COLOR</li>
            <li className={s.yellow}></li>
            {/* <li className="black"></li>*/}
            {/* <li className="blue"></li>*/}
          </ul>
          <div className={s.footer}>
            {itemInCart ? (
              <MyGreenButton onClick={onClickPlus}>Товар добавлен</MyGreenButton>
            ) : (
              <MyGreenButton onClick={onClickPlus}>Add TO Cart</MyGreenButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export {ProductItem};
